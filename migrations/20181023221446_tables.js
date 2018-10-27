exports.up = function (knex, Promise) {

  //makes user table
  createUserTable = () => {
    return knex.schema.createTable('users', (table) => {
      table.increments('id');
      table.string('name');
      table.integer('weight');
      table.float('height');
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
      table.string('food');
      table.integer('ndbno');
      table.float('calories');
      table.float('protein');
      table.float('carbs');
      table.float('fiber');
      table.float('sugar');
      table.float('fat');
      table.dateTime('currDate');

      //fks
      table.foreign('user').references('id').inTable('users');
    })
  }

  //makes blob table
  createBlobTable = () => {
    return knex.schema.createTable('blobs', (table) => {
      table.increments('id');
      table.string('name');
      table.integer('user').unsigned().notNullable();
      table.float('sleep');
      table.integer('calories');

      //fks
      table.foreign('user').references('id').inTable('users');
    })
  }

  return createUserTable()
    .then(createSleepTable)
    .then(createCalorieTable)
    .then(createBlobTable)
    .catch('error creating tables');
}

exports.down = function (knex, Promise) {
  let dropUsers = `DROP TABLE IF EXISTS users`;
  let dropSleep = `DROP TABLE IF EXISTS sleep`;
  let dropCalories = `DROP TABLE IF EXISTS calories`;
  let dropBlobs = `DROP TABLE IF EXISTS blobs`;
  return knex.raw(dropCalories)
    .then(knex.raw(dropSleep))
    .then(knex.raw(dropBlobs))
    .then(knex.raw(dropUsers))
    .catch('error dropping tables');
}

