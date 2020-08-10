'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  async findProgress(ctx) {
    const { id: promotionId } = ctx.params;
    const user = ctx.state.user;

    if (user.role.name !== 'Customer') {
      ctx.response.status = 403;
      ctx.response.body = { message: 'Promotion participation is only for customers.' };
      return;
    }

    const promotionProgresses = await strapi
      .query('progress')
      .find({ user: user.id, promotion: promotionId });

    if (promotionProgresses.length === 0) {
      ctx.response.status = 404;
      ctx.response.body = { message: 'No progress exists.' };
      return;
    }

    if (promotionProgresses.length > 1) {
      console.warn('Found multiple progresses for one promotion.');
    }

    return promotionProgresses[0];
  },

  async participate(ctx) {
    const { id } = ctx.params;
    const user = ctx.state.user;

    if (user.role.name !== 'Customer') {
      ctx.response.status = 403;
      ctx.response.body = { message: 'Promotion participation is only for customers.' };
      return;
    }

    const promotion = await strapi.query('promotion').findOne({ id });
    if (promotion === null) {
      ctx.response.status = 404;
      ctx.response.body = {
        message: 'The specified promotion was not found.',
      };
      return;
    }
    const promotionProgresses = promotion.progresses.filter(
      (progress) => progress.user === user.id,
    );
    if (promotionProgresses.length > 1) {
      ctx.response.status = 304;
      ctx.response.body = {
        message: 'Already participating.',
      };
      return;
    }

    const subtaskIds = [];

    for (let [index, subtaskDescription] of promotion.subtask.entries()) {
      const subtask = await strapi.query('subtask').create({
        description: subtaskDescription,
        status: 'ongoing',
        index,
      });
      subtaskIds.push(subtask.id);
    }

    await strapi.query('progress').create({
      status: 'ongoing',
      user: user.id,
      promotion: promotion.id,
      subtasks: subtaskIds,
    });

    ctx.response.status = 201;
    ctx.response.body = {
      message: 'Successfully created progress and subtasks.',
    };
  },
};
