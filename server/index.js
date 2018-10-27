const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const moment = require('moment');

const USDA_TOKEN = process.env.USDA_TOKEN || require('../config').USDA_TOKEN;
const environment = process.env.NODE_ENV || 'development'; // if something else isn't setting ENV, use development
const configuration = require('../knexfile')[environment]; // require environment's settings from knexfile
const database = require('knex')(configuration); // connect to DB via knex using env's settings


const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/../client/dist'));


// user routes grab user data from database
app.get('/api/user', (req, res) => {
  database.select()
    .from('users')
    .orderBy('id', 'asc')
    .then(userData => {
      res.send(userData);
    })
    .catch(err => {
      console.error(`error on server getting userData ${err}`);
    })
})

// user input data
app.post('/api/user', (req, res) => {
  database('users').insert(req.body)
    .then(() => {
      res.send('Post Success');
    }).catch(err => {
      console.error(`error on server posting user ${err}`);
    })
});

// sleep routes gets sleep data
app.get('/api/sleep/:userID', (req, res) => {
  database.select()
    .where({user: req.params.userID})
    .from('sleep')
    .orderBy('nightSlept', 'desc')
    .limit(7)
    .then(sleepData => {
      res.json(sleepData);
    })
    .catch(err => {
      console.error(`error on server getting sleepData ${err}`)
    })

});

app.post('/api/sleep/post', (req, res) => {
  const sleepObj = req.body;
  database('sleep').insert({
    user: sleepObj.user,
    hourCount: sleepObj.hourCount,
    startHour: sleepObj.startHour,
    endHour: sleepObj.endHour,
    nightSlept: sleepObj.nightSlept
  })
  .then(() => {
    console.log('post successful')
    res.end('sleep post successful')
    })
  .catch((err) => {
    console.log('error posting', err)
    res.end('error posting sleep data', err)
  })
})

// calories
app.post('/api/getCalories', (req, res) => {
  database
  .where({user: req.body.user})
  .select('currDate', 'calories')
  .from('calories')
  .then((table) => {
    const today = new Date();

    const todayCalArr = [];
    let totalCal = 0;

    for (let obj of table) {
      if (obj.currDate.getDate() === today.getDate() && 
          obj.currDate.getMonth() === today.getMonth()) {
        todayCalArr.push(obj);
        totalCal += obj.calories;
      } else {
        break;
      }
    }

    // send back to front end
    res.send(JSON.stringify(totalCal))

  }).catch((err) => console.log('>>> ERROR in getting total cal from db', err))

})

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
  }).catch((err)=> {
    console.log('>>> ERRRR in query', err)
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
      nutObj.currDate = moment().format('YYYY-MM-DD');

      // save 'food' and 'ndbno' to database
      database('calories').insert(nutObj).then((data) => {
        console.log('>>> DB inserted!')
      })
      .catch((err) => {
        console.log('>>> ERROR in inserting to DB!', err)
      })
      // send to front end
      res.status(201).send(nutObj)

    })

  })

})


app.listen(process.env.PORT || 3000, () => {
  console.log(`listening on port ${PORT}`);
});
