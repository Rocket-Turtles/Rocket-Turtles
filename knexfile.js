// Update with your config settings.
// created with shell command: knex init
// working from knex cheatsheet https://gist.github.com/laurenfazah/e0b0033cdc40a313d4710cc04e654556
// migration with shell command: knex migrate:make table


module.exports = {
  // use when not using deployment
  development: {
    client: 'pg',
    connection: {
      host: 'localhost',
      database: 'rocketturtle'
    }, 
    migrations: {
      directory: './db/migrations'
    },
    seeds: {
      directory: './db/seeds/dev'
    },
    useNullAsDefault: true
  },

  // use when deployed
  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL + `?ssl=true`,
    migrations: {
      directory: './migrations'
    },
    seeds: {
      directory: './seeds'
    }
  }
};

