'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  async findProgress(ctx) {
    console.log(ctx.state.user);
    ctx.response.send();
  },
  async participate(ctx) {
    const { id } = ctx.params;
    const user = ctx.state.user;

    if (user.role.name !== 'Customer') {
      ctx.response.status = 403;
      ctx.response.body = { error: 'Promotion participation is only for customers.' };
      return;
    }

    const promotion = await strapi.query('promotion').findOne({ id });
    if (promotion === null) {
      ctx.response.status = 404;
      ctx.response.body = {
        error: 'The specified promotion was not found.',
      };
      return;
    }
    const promotionProgress = promotion.progresses.filter((progress) => progress.user === user.id);
    if (promotionProgress.length > 1) {
      ctx.response.status = 304;
      ctx.response.body = {
        message: 'Already participating.',
      };
      return;
    }

    const subtaskIds = [];

    for (let [index, subtaskDescription] of promotion.subtask.entries()) {
      console.log(subtaskDescription, index);
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
