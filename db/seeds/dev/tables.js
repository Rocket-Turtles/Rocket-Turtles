
exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([{
        id: 1,
        name: 'steven',
        weight: 185,
        height: 6,
        age: 30
      }]);
    })
    .then(() => {
      return knex('sleep').insert([{
        id: 1,
        user: 1,
        hourCount: 8,
        startHour: '02:05 PM',
        endHour: '10:05 PM',
        nightSlept: '2018-08-22'
      }])
    })
    .then(() => {
      return knex('calories').insert([{
        id: 1,
        user: 1,
        calories: 200,
        timeAte: '10:10 AM',
        dayAte: '2018-10-22',
        foodAte: 'cheeseburger'
      }])
    })
};
