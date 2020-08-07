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
    console.log(promotion.progresses);

    ctx.response.body = {
      message: 'Successfully created.',
    };
  },
};
