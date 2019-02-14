/* eslint-disable func-names */
exports.up = function (knex, Promise) {
  return knex.schema.createTable('tasks', (table) => {
    table.specificType('tsk_todo', 'text ARRAY');
    table.specificType('tsk_done', 'text ARRAY');
    table
      .integer('tsk_owner')
      .unsigned()
      .references('id')
      .inTable('users')
      .notNullable();
    table.timestamps(true, true);
    table.primary('tsk_owner');
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('tasks');
};
