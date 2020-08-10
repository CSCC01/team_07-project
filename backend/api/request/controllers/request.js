'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  async find(ctx) {
    const { user } = ctx.state;

    if (!user.role.name.toLowerCase().includes('restaurant')) {
      ctx.response.status = 403;
      ctx.response.body = {
        message: 'Promotion participation is only for restaurant owners/stuff.',
      };
      return;
    }

    let requests = await strapi.query('request').find({
      restaurant: user.restaurant,
      status: 'pending',
    });

    requests = requests.map((request) => ({
      id: request.id,
      type: request.type,
      description:
        request.type === 'subtask' ? request.subtask.description : request.coupon.description,
      status: request.status,
    }));

    ctx.response.send(requests);
  },

  async create(ctx) {
    const { user } = ctx.state;
    const { body: requestBody } = ctx.request;

    if (user.role.name !== 'Customer') {
      ctx.response.status = 403;
      ctx.response.body = { message: 'Request creation is only for customer.' };
      return;
    }
    if (!['coupon', 'subtask'].includes(requestBody.type)) {
      ctx.response.status = 400;
      ctx.response.body = { message: 'Incorrect or missing field: type.' };
      return;
    }

    let resultRequest;

    if (requestBody.type === 'coupon') {
      const coupon = await strapi.query('coupon').findOne({ id: requestBody.coupon_id });
      if (coupon === null) {
        ctx.response.status = 404;
        ctx.response.body = { message: 'Coupon not found.' };
        return;
      }

      if (coupon.status !== 'available') {
        ctx.response.status = 400;
        ctx.response.body = { message: 'Coupon is not available for use.' };
        return;
      }

      const newRequestData = {
        user: user.id,
        type: 'coupon',
        status: 'pending',
        restaurant: coupon.restaurant,
        coupon: coupon.id,
      };

      if ((await strapi.query('request').findOne(newRequestData)) !== null) {
        await strapi.query('request').delete(newRequestData);
      }

      resultRequest = await strapi.query('request').create(newRequestData);
    } else {
      const progress = await strapi.query('progress').findOne({
        user: user.id,
        promotion: requestBody.promotion_id,
      });
      let subtask = null;
      if (progress !== null) {
        subtask = progress.subtasks.filter(
          (subtask) => subtask.index === requestBody.subtask_index,
        );
        if (subtask.length > 1) {
          ctx.response.status = 500;
          ctx.response.body = {
            message: 'Subtasks is longer than 1',
            data: subtask,
          };
          return;
        }
        subtask = subtask.length > 0 ? subtask[0] : null;
      }
      if (subtask === null) {
        ctx.response.status = 404;
        ctx.response.body = { message: 'Subtask not found.' };
        return;
      }

      const newRequestData = {
        user: user.id,
        type: 'subtask',
        status: 'pending',
        restaurant: progress.promotion.restaurant,
        subtask: subtask.id,
      };

      // Deleting existing requests
      if ((await strapi.query('request').findOne(newRequestData)) !== null) {
        await strapi.query('request').delete(newRequestData);
      }

      resultRequest = await strapi.query('request').create(newRequestData);
    }

    ctx.response.status = 201;
    ctx.response.send(resultRequest);
  },

  async verify(ctx) {
    const { user } = ctx.state;
    const { id } = ctx.params;

    if (!user.role.name.toLowerCase().includes('restaurant')) {
      ctx.response.status = 403;
      ctx.response.body = {
        message: 'Promotion participation is only for restaurant owners/stuff.',
      };
      return;
    }
    const request = await strapi.query('request').findOne({ id });
    if (request === null) {
      ctx.response.status = 404;
      ctx.response.body = { message: 'Request not found.' };
      return;
    }

    if (request.status === 'confirmed') {
      ctx.response.status = 304;
      ctx.response.body = { message: 'Request already confirmed.' };
      return;
    }

    if (request.status === 'rejected') {
      ctx.response.status = 400;
      ctx.response.body = { message: 'Request already rejected.' };
      return;
    }

    if (request.status !== 'pending') {
      ctx.response.status = 500;
      ctx.response.body = { message: 'Unexpected status: ' + request.status };
      return;
    }

    if (request.type === 'coupon') {
      /**
       * Change coupon status
       */
      await strapi.query('coupon').update({ id: request.coupon.id }, { status: 'used' });
      await strapi.query('request').update({ id: request.id }, { status: 'confirmed' });
      ctx.response.status = 200;
      ctx.response.body = { message: 'Verified.' };
      return;
    }

    if (request.type === 'subtask') {
      /**
       * 1. Update subtask status
       * 2. Check progress, if all completed, then:
       * 2.1. Update progress status
       * 2.2. Give reward
       * 2.3. Update achievement count
       */
      await strapi.query('subtask').update({ id: request.subtask.id }, { status: 'completed' });
      const progress = await strapi.query('progress').findOne({ id: request.subtask.progress });
      const progressIsComplete =
        progress.subtasks.filter((subtask) => subtask.status !== 'completed').length === 0;

      if (progressIsComplete) {
        await strapi.query('progress').update({ id: progress.id }, { status: 'completed' });
        const promotion = await strapi.query('promotion').findOne({ id: progress.promotion.id });
        await strapi.query('coupon').create({
          user: progress.user.id,
          status: 'available',
          description: promotion.coupon,
          restaurant: promotion.restaurant,
        });

        const existingAchievement = await strapi.query('achievement').findOne({
          user: progress.user.id,
          restaurant: promotion.restaurant,
        });

        if (existingAchievement === null) {
          await strapi.query('achievement').create({
            user: progress.user.id,
            restaurant: promotion.restaurant,
            complete_number: 1,
          });
        } else {
          await strapi
            .query('achievement')
            .update(
              { id: existingAchievement.id },
              { complete_number: existingAchievement.complete_number + 1 },
            );
        }
      }

      await strapi.query('request').update({ id: request.id }, { status: 'confirmed' });
      ctx.response.status = 200;
      ctx.response.body = { message: 'Verified.' };

      return;
    }
    ctx.response.status = 500;
    ctx.response.body = { message: 'Unexpected type: ' + request.type };
  },

  async reject(ctx) {
    const { user } = ctx.state;
    const { id } = ctx.params;

    if (!user.role.name.toLowerCase().includes('restaurant')) {
      ctx.response.status = 403;
      ctx.response.body = {
        message: 'Promotion participation is only for restaurant owners/stuff.',
      };
      return;
    }

    const request = await strapi.query('request').findOne({ id });
    if (request === null) {
      ctx.response.status = 404;
      ctx.response.body = { message: 'Request not found.' };
      return;
    }

    if (request.status === 'rejected') {
      ctx.response.status = 304;
      ctx.response.body = { message: 'Request already rejected.' };
      return;
    }

    if (request.status === 'confirmed') {
      ctx.response.status = 400;
      ctx.response.body = { message: 'Request already verified.' };
      return;
    }

    if (request.status !== 'pending') {
      ctx.response.status = 500;
      ctx.response.body = { message: 'Unexpected status: ' + request.status };
      return;
    }

    await strapi.query('request').update({ id }, { status: 'rejected' });
    ctx.response.status = 200;
    ctx.response.body = { message: 'Rejected.' };
  },
};
