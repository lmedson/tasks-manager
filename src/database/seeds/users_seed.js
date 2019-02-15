// eslint-disable-next-line func-names
exports.seed = function (knex, Promise) {
  return knex('users')
    .del()
    .then(() => knex('users').insert([
      {
        name: 'Leia',
        age: 25,
        gender: 'Female',
        tasksTodo: ['wake up at 6h', 'go jogging at the night'],
        tasksDone: ['to visit my friends'],
      },
    ]));
};
