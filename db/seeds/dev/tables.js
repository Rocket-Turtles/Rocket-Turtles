
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
        nightSlept: '2018-08-16'
      },
      {
        id: 2,
        user: 1,
        hourCount: 7,
        startHour: '03:05 PM',
        endHour: '10:05 PM',
        nightSlept: '2018-08-17'
      },
      {
        id: 3,
        user: 1,
        hourCount: 6,
        startHour: '04:05 PM',
        endHour: '10:05 PM',
        nightSlept: '2018-08-18'
      },
      {
        id: 4,
        user: 1,
        hourCount: 4,
        startHour: '06:05 PM',
        endHour: '10:05 PM',
        nightSlept: '2018-08-19'
      },
      {
        id: 5,
        user: 1,
        hourCount: 7,
        startHour: '03:05 PM',
        endHour: '10:05 PM',
        nightSlept: '2018-08-20'
      },
      {
        id: 6,
        user: 1,
        hourCount: 5,
        startHour: '05:05 PM',
        endHour: '10:05 PM',
        nightSlept: '2018-08-21'
      },
      {
        id: 7,
        user: 1,
        hourCount: 6,
        startHour: '04:05 PM',
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
