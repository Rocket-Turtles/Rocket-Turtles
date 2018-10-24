const express = require('express');
const bodyParser = require('body-parser');

/* 
knex cheatsheet found at: https: //gist.github.com/laurenfazah/e0b0033cdc40a313d4710cc04e654556
suggests we may need the following to connect to db

const environment = process.env.NODE_ENV || 'development'; // if something else isn't setting ENV, use development
const configuration = require('../knexfile')[environment]; // require environment's settings from knexfile
const database = require('knex')(configuration); // connect to DB via knex using env's settings
*/

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/../client/dist'));

app.post('/user', (req, res) => {
  res.send(req.body);
})

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});