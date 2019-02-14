/* eslint-disable func-names */
exports.up = function (knex, Promise) {
  return knex.schema.createTable('users', (table) => {
    table.increments();
    table.string('usr_name', 20).notNullable();
    table.integer('usr_age', 3).notNullable();
    table.enu('usr_genero', ['Masculino', 'Feminino']);
    table.timestamps(true, true);
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('users');
};
