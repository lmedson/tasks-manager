// to run migrations
require('dotenv').config({ path: './src/config/.env' });

const knexfile = require('../database/knexfile');

module.exports = {
  db: knexfile,
  port: process.env.PORT || 3000,
};
