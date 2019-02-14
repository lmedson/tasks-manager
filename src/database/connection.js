const { db } = require('../config/settings');

// eslint-disable-next-line import/order
const knex = require('knex')(db);

module.exports = knex;
