const moment = require('moment');

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
      return knex('calories').insert([{
        id: 1,
        user: 1,
        food: 'pizza',
        ndbno: 21272,
        calories: 200,
        protein: 100,
        carbs: 100,
        fiber: 50,
        sugar: 100, 
        fat: 100,
        currDate: moment().format('YYYY-MM-DD')
      }])
    })
    .then(() => {
      return knex('blobs').insert([{
        id: 1,
        name: 'Blobby',
        user: 1,
        sleep: 8,
        calories: 200
      }])
    })
};
