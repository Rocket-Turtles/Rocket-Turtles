import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import moment from 'moment';

import Sleep from './components/Sleep.jsx';
import UserInput from './components/UserInput.jsx';
import UserProfile from './components/UserProfile.jsx';
import Calories from './components/Calories.jsx';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      // calories
      food: '',
      calDisplay: false,
      nutrients: {},

      // after user signs in --> go to DB and check if we have user in database --> if user exists --> bring back user id --> else --> insert user in DB and retrieve user id
      user: {
        id: '',
        name: '',
        age: '',
        weight: '',
        height: ''
      },

      //sleep states:
      sleepWeek: [],
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
    this.getUserData();
  };

  handleClick(event){
    event.preventDefault();
    // send to server
    if (event.target.name === 'calories') {
      axios.post('/api/calories', {food: this.state.food, user: this.state.userID}).then((res) => {
        // display on screen
        this.setState({
          calDisplay: true,
          nutrients: res.data
        })
      })
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

  //user methods
  //get user data

  getUserData() {
    axios.get('/api/user')
      .then(userData => {
        this.setState({
          user: userData.data[0]
        })
      })
  }

  //sleep methods:
  //gets sleep data
  getSleepData() {
    axios.get('/api/sleep')
    .then(sleepData => {
    
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
    let average = this.state.sleepWeek.length ? (this.state.sleepWeek.reduce(reducer, 0) / this.state.sleepWeek.length).toFixed(2) : 0;
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
    let duration = moment.duration(moment(this.state.wakeTime).diff(moment(this.state.sleepTime)));
    let hourCount = duration.asHours();
    let nightSlept = moment(this.state.sleepTime).format('YYYY-MM-DD');
    let start = moment(this.state.sleepTime).format('hh:mm A')
    let end = moment(this.state.wakeTime).format('hh:mm A')
    let sleepObj = {
      user: this.state.user.id,
      hourCount: hourCount,
      startHour: start,
      endHour: end,
      nightSlept: nightSlept
    }
    console.log('sleepObj', sleepObj);
    axios.post('/api/sleep', sleepObj)
    .then(() => {
      console.log('post response received');
      this.getSleepData();
    })
    .catch(err => {
      console.log('error posting new sleep night on client: ', err)
    })
  }


  render() {
    let calDisElem = this.state.calDisplay ? <div>+ {this.state.nutrients.calories} kcal</div> : <div></div> ;

    return(
      <div>
        <UserProfile user={this.state.user}/>
        <UserInput />
        <Calories handleChange={this.handleChange.bind(this)} handleClick={this.handleClick.bind(this)} />
        {calDisElem}
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
