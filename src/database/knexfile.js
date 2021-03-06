// Update with your config settings.
// setup here for tests
require('dotenv').config({ path: '../config/.env' });

module.exports = {
  client: process.env.DB_CLIENT,
  connection: {
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    host: process.env.DB_HOST,
  },
  pool: {
    min: 2,
    max: 10,
  },
  migrations: {
    tableName: 'knex_migrations',
  },
  seeds: {
    directory: `${__dirname}/seeds`,
  },
};
