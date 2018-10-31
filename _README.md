# Blob

> A tamagotchi style health tracking app

## Team

- **Product Owner**: Rikki
- **Scrum Master**: Steven
- **Development Team Members**: Yirey, Ethan

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)
   1. [Installing Dependencies](#installing-dependencies)
   1. [Tasks](#tasks)
1. [Team](#team)
1. [Contributing](#contributing)

## Usage

> Sign up and start entering sleep and food data. Your Blob will appreciate it.

## Requirements

- Node: ^8.11.3
- axios: ^0.18.0,
- body-parser: ^1.18.3,
- chart.js: ^2.7.3,
- express: ^4.16.4,
- knex: ^0.15.2,
- moment: ^2.22.2,
- pg: ^7.5.0,
- react: ^16.5.2,
- react-chartjs-2: ^2.7.4,
- react-datetime: ^2.16.2,
- react-dom: ^16.5.2

## Development

### Installing Dependencies

From within the root directory:

```sh
npm install
```

### Manipulating Postgresql from Heroku

Resetting db

```sh
heroku pg:reset DATABASE
```

Migrating DB

```sh
heroku run knex migrate:latest
```

Seeding DB

```sh
heroku run knex seed:run
```

Checking logs

```sh
heroku logs --tail
```

Opening page

```sh
heroku open
```

### Deployment

```sh
git push heroku master
```

### Roadmap

View the project roadmap [here](https://github.com/Rocket-Turtles/Rocket-Turtles/issues)

## Contributing

See [CONTRIBUTING.md](_CONTRIBUTING.md) for contribution guidelines.
