/* eslint-disable func-names */
exports.up = function (knex, Promise) {
  return knex.schema.createTable('users', (table) => {
    table.increments();
    table.string('name', 20).notNullable();
    table.integer('age', 3).notNullable();
    table.enu('gender', ['Masculino', 'Feminino']);
    table.specificType('tasksTodo', 'text ARRAY');
    table.specificType('tasksDone', 'text ARRAY');
    table.timestamps(true, true);
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('users');
};
