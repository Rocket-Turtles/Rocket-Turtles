

exports.up = function (knex, Promise) {

  //makes user table
  createUserTable = () => {
    return knex.schema.createTable('users', (table) => {
      table.increments('id');
      table.string('name');
      table.integer('weight');
      table.integer('height'); // TODO figure out how we want to store height
      table.integer('age');
    })
  }

  //makes sleep table
  createSleepTable = () => {
    return knex.schema.createTable('sleep', (table) => {
      table.increments('id');
      table.integer('user').unsigned().notNullable();
      table.float('hourCount');
      table.time('startHour');
      table.time('endHour');
      table.date('nightSlept');

      //fks
      table.foreign('user').references('id').inTable('users');
    })
  }

  //makes calorie table
  createCalorieTable = () => {
    return knex.schema.createTable('calories', (table) => {
      table.increments('id');
      table.integer('user').unsigned().notNullable();
      table.integer('calories');
      table.time('timeAte');
      table.date('dayAte');
      table.string('foodAte');

      //fks
      table.foreign('user').references('id').inTable('users');
    })
  }

  return createUserTable()
    .then(createSleepTable)
    .then(createCalorieTable)
    .catch('error creating tables');
}

exports.down = function (knex, Promise) {
  let dropUsers = `DROP TABLE IF EXISTS users`;
  let dropSleep = `DROP TABLE IF EXISTS sleep`;
  let dropCalories = `DROP TABLE IF EXISTS calories`;
  return knex.raw(dropCalories)
    .then(knex.raw(dropSleep))
    .then(knex.raw(dropUsers))
    .catch('error dropping tables');
}

