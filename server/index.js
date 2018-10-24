const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const environment = process.env.NODE_ENV || 'development'; // if something else isn't setting ENV, use development
const configuration = require('../knexfile')[environment]; // require environment's settings from knexfile
const database = require('knex')(configuration); // connect to DB via knex using env's settings
const { USDA_TOKEN } = require('../config');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/../client/dist'));

app.get('/api/sleep', (req, res) => {
  database.select().from('sleep')
    .then(sleepData => {
      //console.log(`sleepData on server is ${sleepData}`)
      res.json(sleepData);
    })
    .catch(err => {
      console.error(`error on server getting sleepData ${err}`)
    })
})

// calories
app.post('/api/calories', (req, res) => {
  const food = req.body.food;
  const user = req.body.user;

  // make USDA API search request for food id
  axios.get('https://api.nal.usda.gov/ndb/search/', {
    params: {
      format: 'json',
      q: food,  // query
      max: 25,  // max query results
      ds: 'Standard Reference',  // choose b/w branded or standard reference
      api_key: USDA_TOKEN
    }
  }).then((search) => {
    const ndbno = search.data.list.item[0].ndbno  //.item[0].ndbno;  // get top most relevant object (is array)
    
    // make USDA API report request for nutrients
    axios.get('https://api.nal.usda.gov/ndb/V2/reports/', {
      params: {
        format: 'json',
        ndbno: ndbno,
        api_key: USDA_TOKEN
      }
    }).then((report) => {
      // const calories = report.data.report.food.nutrients;
      console.log('>>> calorie report', report.data.foods[0].food.nutrients)

    })
    // save 'food' and 'ndbno' to database

  })

  
  // save to db
  database.insert({
    user, food
  })

})

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});