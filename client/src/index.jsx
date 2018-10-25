import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import moment from 'moment';

import Sleep from './components/Sleep.jsx';
import UserInput from './components/UserInput.jsx';
import Calories from './components/Calories.jsx';
import dummySleepData from '../../dummydata/dummySleepData.js'

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      // calories
      food: '',

      // after user signs in --> go to DB and check if we have user in database --> if user exists --> bring back user id --> else --> insert user in DB and retrieve user id
      userID: '',

      //sleep states:
      sleepWeek: dummySleepData,
      weeklyAverage: 0,
      sleepTime: '',
      wakeTime: ''
    };
    this.getSleepTime = this.getSleepTime.bind(this);
    this.getWakeTime = this.getWakeTime.bind(this);
    this.postSleepEntry = this.postSleepEntry.bind(this);
  }
  
  componentDidMount() {
    this.getSleepData();
  };

  handleClick(event){
    event.preventDefault();
    // send to server
    if (event.target.name === 'calories') {
      axios.post('/api/calories', {food: this.state.food, user: this.state.userID})
    }
  }

  handleChange(event){
    event.preventDefault();
    event.persist();

    if (event.target.name === 'calories') {
      this.setState({
        food: event.target.value
      })
    }
  };


  //sleep methods:
  //gets sleep data
  getSleepData() {

    //console.log('getSleepData() invoked')
    axios.get('/api/sleep')
    .then(sleepData => {
      //console.log(`sleepdata on client is: ${JSON.stringify(sleepData.data)}`)
      this.setState({
        sleepWeek: sleepData.data
      })
    })
    .then(() => {
      this.getAverage(this.state.sleepWeek);
    })
    .catch(err => {
      console.log(`error getting sleepdata on client: ${err}`)
    });
  };

  //calculates average hours from most recent 7 nights of sleep
  getAverage(weekData) {
    const reducer = (acc, cur) => acc + cur.hourCount;
    const getAverage = (arr) => {
      return weekData.reduce(reducer, 0)
    };
    let average = (getAverage(weekData.sleepWeek) / 7).toFixed(2);
    this.setState({
      weeklyAverage: average
    })
  }

  //gets time for new going to sleep entry
  getSleepTime(date) {
    this.setState({
      sleepTime: date.toDate()
    });
  }

  //gets time for new waking up entry
  getWakeTime(date) {
    this.setState({
      wakeTime: date.toDate()
    });
  }

  postSleepEntry() {
    let hourCount = moment(this.state.wakeTime).subtract(this.state.sleepTime).toDate();
    console.log('hour count is: ', hourCount)
    let sleepObj = {
      user: 1,
      hourCount: hourCount
    }
    axios.post('/api/sleep', {sleepObj})
  }


  render() {
    return(
      <div>
        <UserInput />
        <Calories handleChange={this.handleChange.bind(this)} handleClick={this.handleClick.bind(this)} />
        <br></br>
        <Sleep 
          sleepWeek={this.state.sleepWeek}
          weeklyAverage={this.state.weeklyAverage}
          getSleepTime={this.getSleepTime}
          getWakeTime={this.getWakeTime}
          postSleepEntry={this.postSleepEntry}
        />
      </div>
    )
  };
}

ReactDOM.render(<App />, document.getElementById('App'));
