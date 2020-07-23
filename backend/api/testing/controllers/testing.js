'use strict';

const fs = require('fs');
const path = require('path');

/**
 * A set of functions called "actions" for `testing`
 */

module.exports = {
  reset: async (ctx) => {
    const isTestingServer = strapi.config.get('server.testing', false);
    if (!isTestingServer) {
      ctx.response.status = 404;
      ctx.response.body = { error: 'Not testing server.' };
      return;
    }
    const pwd = process.env.PWD;
    if (pwd === undefined || (!pwd.endsWith('backend') && !pwd.endsWith('backend/'))) {
      ctx.response.status = 500;
      ctx.response.body = { error: 'Testing environment assertion failed.' };
    }

    const from = path.join(pwd, 'testing.db');
    const backup = path.join(pwd, '.tmp/old-data.db');
    const to = path.join(pwd, strapi.config.get('database.connections.default.settings.filename'));

    fs.copyFileSync(to, backup);
    fs.copyFileSync(from, to);

    ctx.response.body = { message: 'Successfully reset the database.' };
  },
};
