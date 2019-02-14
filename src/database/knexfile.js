// Update with your config settings.

module.exports = {
  client: 'pg',
  connection: {
    database: 'myproject',
    user: 'myprojectuser',
    password: 'password',
  },
  pool: {
    min: 2,
    max: 10,
  },
  migrations: {
    tableName: 'knex_migrations',
  },
};