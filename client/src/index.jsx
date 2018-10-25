import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import moment from 'moment';

import Sleep from './components/Sleep.jsx';
import Calories from './components/Calories.jsx';
import dummySleepData from '../../dummydata/dummySleepData.js'

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      // calories
      food: '',

      //sleep states:
      sleepWeek: dummySleepData,
      weeklyAverage: 0,
      sleepTime: '',
      wakeTime: ''
    };
    this.getSleepTime = this.getSleepTime.bind(this);
    this.getWakeTime = this.getWakeTime.bind(this);
  }
  
  componentDidMount() {
    this.getSleepData();
  };

  handleClick(event){
    event.preventDefault();
    // send to server
    if (event.target.name === 'calories') {
      axios.post('/calories', {food: this.state.food})
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
    console.log('getSleepData() invoked')
    axios.get('/api/sleep')
    .then(sleepData => {
      console.log(`sleepdata on client is: ${JSON.stringify(sleepData.data)}`)
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
    sleepObj = {
      // todo set up object to sent to db and finish post request
    }
    axios.post('/api/sleep', {})
  }


  render() {
    return(
      <div>
        hi
        <Calories handleChange={this.handleChange.bind(this)} handleClick={this.handleClick.bind(this)} />
        <br></br>
        <Sleep 
          sleepWeek={this.state.sleepWeek}
          weeklyAverage={this.state.weeklyAverage}
          getSleepTime={this.getSleepTime}
          getWakeTime={this.getWakeTime}
        />
      </div>
    )
  };
}

ReactDOM.render(<App />, document.getElementById('App'));
