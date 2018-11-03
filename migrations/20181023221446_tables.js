exports.up = function(knex, Promise) {
  //makes user table
  createUserTable = () => {
    return knex.schema.createTable("users", table => {
      table.increments("id");
      table.string("email_id")
      table.string("name");
      table.integer("weight");
      table.decimal("height");
      table.integer("age");
    });
  };

  createFriendTable = () => {
    return knex.schema.createTable("friends", table => {
      table.increments("id");
      table
        .integer("user_id")
        .unsigned()
        .notNullable();
      table
        .integer("friend_id")
        .unsigned()
        .notNullable();

      //fks
      table
        .foreign("user_id")
        .references("id")
        .inTable("users");
      table
        .foreign("friend_id")
        .references("id")
        .inTable("users");
    });
  };

  //makes sleep table
  createSleepTable = () => {
    return knex.schema.createTable("sleep", table => {
      table.increments("id");
      table
        .integer("user")
        .unsigned()
        .notNullable();
      table.float("hourCount");
      table.time("startHour");
      table.time("endHour");
      table.date("nightSlept");

      //fks
      table
        .foreign("user")
        .references("id")
        .inTable("users");
    });
  };

  //makes calorie table
  createCalorieTable = () => {
    return knex.schema.createTable("calories", table => {
      table.increments("id");
      table
        .integer("user")
        .unsigned()
        .notNullable();
      table.string("food");
      table.integer("ndbno");
      table.float("calories");
      table.float("protein");
      table.float("carbs");
      table.float("fiber");
      table.float("sugar");
      table.float("fat");
      table.dateTime("currDate");

      //fks
      table
        .foreign("user")
        .references("id")
        .inTable("users");
    });
  };

  //makes blob table
  createBlobTable = () => {
    return knex.schema.createTable("blobs", table => {
      table.increments("id");
      table.string("name");
      table
        .integer("user")
        .unsigned()
        .notNullable();
      table.float("sleep");
      table.integer("calories");

      //fks
      table
        .foreign("user")
        .references("id")
        .inTable("users");
    });
  };

  return createUserTable()
    .then(createSleepTable)
    .then(createCalorieTable)
    .then(createBlobTable)
    .then(createFriendTable)
    .catch("error creating tables");
};

exports.down = function(knex, Promise) {
  console.log('TEARING IT DOWN')
  return knex.schema
    .dropTableIfExists('blobs')
    .dropTableIfExists('calories')
    .dropTableIfExists('sleep')
    .dropTableIfExists('friends')
    .dropTableIfExists('users');
};
