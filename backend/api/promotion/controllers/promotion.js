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
      ctx.throw(403, 'Promotion participation is only for customers.');
    }

    const promotionProgresses = await strapi
      .query('progress')
      .find({ user: user.id, promotion: promotionId });

    ctx.assert(promotionProgresses.length > 0, 404, 'No progress exists.');
    ctx.assert(
      promotionProgresses.length === 1,
      500,
      'Found multiple progresses for one promotion.',
    );

    return promotionProgresses[0];
  },

  async participate(ctx) {
    const { id } = ctx.params;
    const user = ctx.state.user;

    if (user.role.name !== 'Customer') {
      ctx.throw(403, 'Promotion participation is only for customers.');
    }

    const promotion = await strapi.query('promotion').findOne({ id });
    ctx.assert(promotion !== null, 404, 'The specified promotion was not found.');
    const promotionProgresses = promotion.progresses.filter(
      (progress) => progress.user === user.id,
    );
    ctx.assert(promotionProgresses.length === 0, 304, 'Already participating.');

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
