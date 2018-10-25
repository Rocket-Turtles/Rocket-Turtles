const express = require('express');
const bodyParser = require('body-parser');

const environment = process.env.NODE_ENV || 'development'; // if something else isn't setting ENV, use development
const configuration = require('../knexfile')[environment]; // require environment's settings from knexfile
const database = require('knex')(configuration); // connect to DB via knex using env's settings


const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/../client/dist'));

//sleep routes
app.get('/api/sleep', (req, res) => {
  //console.log(`request on server is: ${req.body}`)
  database.select()
    .from('sleep')
    .orderBy('nightSlept', 'asc')
    .limit(7)
    .then(sleepData => {
      //console.log(`sleepData on server is ${sleepData}`)
      res.json(sleepData);
    })
    .catch(err => {
      console.error(`error on server getting sleepData ${err}`)
    })
})

app.post('/api/sleep', (req, res) => {
  // todo finish this 
})


app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});