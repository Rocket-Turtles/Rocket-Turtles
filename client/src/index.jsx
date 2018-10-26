import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import moment from 'moment';

import Sleep from './components/Sleep.jsx';
import UserInput from './components/UserInput.jsx';
import UserProfile from './components/UserProfile.jsx';
import Calories from './components/Calories.jsx';
import Welcome from './components/Welcome.jsx'
import Login from './components/Login.jsx'
import Sidebar from './components/Sidebar.jsx'

import '../../css/style.css'

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      view: 'nutrition',

      // calories
      food: '',
      calDisplay: false,
      nutrients: {},
      totalCalories: 0,

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
    this.handleViewChange = this.handleViewChange.bind(this);

    this.getSleepTime = this.getSleepTime.bind(this);
    this.getWakeTime = this.getWakeTime.bind(this);
    this.postSleepEntry = this.postSleepEntry.bind(this);
    this.getSleepData = this.getSleepData.bind(this);

    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);

    // this.handleNumber = this.handleNumber.bind(this);
    // this.handleNewUserSubmit = this.handleNewUserSubmit.bind(this);
    this.getUserData = this.getUserData.bind(this);
  }
  
  componentDidMount() {
    if (this.state.user.id !== '') {
      this.getUserData();
      this.getSleepData();
    } 
  };

  handleViewChange(option) {
    if (option === 'nutrition') {
      this.setState({
        view: 'nutrition'
      })
    } else {
      this.setState({
        view: 'sleep'
      })
    }
  };

  // calorie methods
  handleClick(event){
    event.preventDefault();
    // send to server
    if (event.target.name === 'calories') {
      axios.post('/api/calories', {food: this.state.food, user: this.state.user.id}).then((res) => {
        // display on screen
        this.setState({
          calDisplay: true,
          nutrients: res.data,
          totalCalories: res.data.calories ? this.state.totalCalories + res.data.calories : this.state.totalCalories
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
          // Change the array index to switch users for now
          // Will change this later
          user: userData.data[0]
        })
      }).then(() => {
        axios.post('/api/getCalories', {user: this.state.user.id}).then((cal) => {
          this.setState({totalCalories: JSON.parse(cal.data)})
          this.getSleepData();
        })
        
      })
  }

  //sleep methods:
  //gets sleep data
  getSleepData() {
    axios.get(`/api/sleep/${this.state.user.id}`)
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
    axios.post('/api/sleep/post', sleepObj)
    .then(() => {
      console.log('post response received');
      this.getSleepData();
    })
    .catch(err => {
      console.log('error posting new sleep night on client: ', err)
    })
  }


  render() {

    {if (this.state.user.id !== '') {
      return(
        <div className='main'>
          <Welcome 
            handleViewChange={this.handleViewChange}
            view={this.state.view}
          />
          <div className='sidebar'>
            <Sidebar

              view={this.state.view}
              user={this.state.user}
              
              
              handleChange={this.handleChange} 
              handleClick={this.handleClick}

              sleepWeek={this.state.sleepWeek}
              weeklyAverage={this.state.weeklyAverage}
              getSleepTime={this.getSleepTime}
              getWakeTime={this.getWakeTime}
              postSleepEntry={this.postSleepEntry}
            />
          </div>
          <div className='footer'>
            ® Rocket Turtle
          </div>
        </div>
      )
    } else {
      return(
        <div className='main'>
          <Welcome />
          <Login 
            getUserData={this.getUserData}
          />
          <div className='footer'>
            ® Rocket Turtle LLC
          </div>
        </div>
      )
    }}
  };
}

ReactDOM.render(<App />, document.getElementById('App'));
