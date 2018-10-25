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


//user routes
app.post('/api/user', (req, res) => {
  database('users').insert(req.body)
    .then(() => {
      console.log('Post Success');
      res.send('Post Success');
    }).catch(err => {
      console.error(`error on server posting user ${err}`);
    })
});


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
});

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
    const ndbno = search.data.list.item[0].ndbno;  // get top most relevant object (is array)

    // make USDA API report request for nutrients
    axios.get('https://api.nal.usda.gov/ndb/V2/reports/', {
      params: {
        format: 'json',
        ndbno: ndbno,
        api_key: USDA_TOKEN
      }
    }).then((report) => {
      const nutrients = report.data.foods[0].food.nutrients;  // first food report

      const nutObj = {};
      for (let obj of nutrients) {
        if (obj.nutrient_id === '208') {
          nutObj.calories = parseFloat(obj.value)
        } else if (obj.nutrient_id === '203') {
          nutObj.protein = parseFloat(obj.value)
        } else if (obj.nutrient_id === '205') {
          nutObj.carbs = parseFloat(obj.value)
        } else if (obj.nutrient_id === '291') {
          nutObj.fiber = parseFloat(obj.value)
        } else if (obj.nutrient_id === '269') {
          nutObj.sugar = parseFloat(obj.value)
        } else if (obj.nutrient_id === '204') {
          nutObj.fat = parseFloat(obj.value)
        }
      }

      nutObj.user = user;
      nutObj.food = food;
      nutObj.ndbno = parseInt(ndbno);

      // save 'food' and 'ndbno' to database
      database('calories').insert(nutObj).then((data) => {
        // console.log('>>> DB inserted!')
      }).catch((err) => {
        console.error(err)
      })
      // send to front end
      res.status(201).send(nutObj)

    })

  })

})

app.post('/api/sleep', (req, res) => {
  // todo finish this 
})


app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
