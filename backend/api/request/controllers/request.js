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

      // NOTE: Not checking existing requests

      resultRequest = await strapi.query('request').create({
        user: user.id,
        type: 'coupon',
        status: 'pending',
        restaurant: coupon.restaurant,
        coupon: coupon.id,
      });
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
        if (subtask.length > 1) console.warn('Subtasks is longer than 1: ', subtask);
        subtask = subtask.length > 0 ? subtask[0] : null;
      }
      if (subtask === null) {
        ctx.response.status = 404;
        ctx.response.body = { message: 'Subtask not found.' };
        return;
      }

      // NOTE: Not checking existing requests

      resultRequest = await strapi.query('request').create({
        user: user.id,
        type: 'subtask',
        status: 'pending',
        restaurant: progress.promotion.restaurant,
        subtask: subtask.id,
      });
    }

    ctx.response.status = 201;
    ctx.response.send(resultRequest);
  },

  async verify() {},
  async reject() {},
};
