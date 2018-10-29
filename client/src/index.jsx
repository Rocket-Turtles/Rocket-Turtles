import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import moment from 'moment';

import Welcome from './components/Welcome.jsx'
import Login from './components/Login.jsx'
import Sidebar from './components/Sidebar.jsx'
import BlobWindow from './components/BlobWindow.jsx';

import '../css/style.css'

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      view: 'nutrition',
      globalTimeOfDay: 'morning',

      totalCalories: 0,

      // list of all users in the db:
      users: [],
      // current user's state
      // TODO:: can we add gender?
      user: {  
        id: '',
        name: '',
        age: '',
        weight: '',
        height: ''
      },

      //sleep states:
      sleepWeek: [{
        endHour: "00:00:00",
        hourCount: 0,
        id: 0,
        nightSlept: "0000-00-00T00:00:00.000Z",
        startHour: "00:00:00",
        user: 0
      }],
      weeklyAverage: 0,
      sleepTime: '',
      wakeTime: ''
    };

    this.handleViewChange = this.handleViewChange.bind(this);

    this.getSleepData = this.getSleepData.bind(this);
    this.getSleepTime = this.getSleepTime.bind(this);
    this.getWakeTime = this.getWakeTime.bind(this);
    this.postSleepEntry = this.postSleepEntry.bind(this);

    this.handleUserChange = this.handleUserChange.bind(this);
    this.getUserData = this.getUserData.bind(this);
  }
  
  // global methods
  componentDidMount() {
    this.getUserData();
    this.setGlobalTime();
  };

  handleViewChange(option) {
    if (option === 'nutrition') {
      this.setState({
        view: 'nutrition'
      });
    } else if (option === 'sleep') {
      this.setState({
        view: 'sleep'
      });
      this.getSleepData();
    } else if (option === 'login') {
      this.setState({
        view: 'login',
        user: {
          id: '',
          name: '',
          age: '',
          weight: '',
          height: ''
        }
      });
    }
  };

  setGlobalTime() {
    const afternoon = 12;
    const evening = 17;
    const night = 20;
    const currentHour = moment().format('HH');

    if (currentHour >= afternoon && currentHour <= evening) {
      this.setState({
        globalTimeOfDay: 'afternoon'
      });
    } else if (currentHour >= evening && currentHour <= night) {
      this.setState({
        globalTimeOfDay: 'evening'
      });
    } else if (currentHour >= night) {
      this.setState({
        globalTimeOfDay: 'night'
      });
    } else {
      this.setState({
        globalTimeOfDay: 'morning'
      });
    }

  }

  handleUserChange(e){
    this.setState({
      user: JSON.parse(e.target.value)
    }, 
    () => {
      axios.post('/api/getCalories', {user: this.state.user.id}).then((cal) => {
        this.setState({totalCalories: JSON.parse(cal.data)})
      }).catch((err) => {
        console.log('>>>> ERROR in getting cal from DB from axios', err)
      }).then(() => {
        this.getSleepData();
      }).catch((err) => {
        console.error('ERROR on getting sleepData', err);
      })
    })
  }

  //get user data
  getUserData() {
    axios.get('/api/user')
      .then(userData => {
        this.setState({
          users: userData.data
        })
      })
      .catch(err => {
        console.log('error in getUserData on index.jsx: ', err)
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
  getAverage() {
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

  //posts new sleep entry
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

  getCalTotal(totalCalories){
    this.setState({totalCalories})
  }

  render() {
    {if (this.state.user.id !== '') {
      return(
        <div className='main'>
          <Welcome 
            handleViewChange={this.handleViewChange}
            view={this.state.view}
          />
          <div className='blobWindow'>
            <BlobWindow 
              globalTimeOfDay={this.state.globalTimeOfDay}
              weeklyAverage={this.state.weeklyAverage}
              totalCalories={this.state.totalCalories}
            />
          </div>
          <div className='sidebar'>
            <Sidebar
              view={this.state.view}
              user={this.state.user}  // used also in calories component
              globalTimeOfDay={this.state.globalTimeOfDay}
              
              // getSleepData={this.getSleepData}
              sleepWeek={this.state.sleepWeek}
              weeklyAverage={this.state.weeklyAverage}
              getSleepTime={this.getSleepTime}
              getWakeTime={this.getWakeTime}
              postSleepEntry={this.postSleepEntry}

              // for calories component calories
              totalCalories={this.state.totalCalories}
              getCalTotal={this.getCalTotal.bind(this)}
            />
          </div>
          <div className='footer'>
            <div className='footerReg'>
              ® Rocket Turtle
            </div>
          </div>
        </div>
      )
    } else {
      return(
        <div className='main'>
          <Welcome />
          <Login 
            getUserData={this.getUserData} 
            handleUserChange={this.handleUserChange} 
            users={this.state.users}
            handleViewChange={this.handleViewChange} 
            />
          <div className='footer'>
            <div className='footerReg'>
              ® Rocket Turtle
            </div>
          </div>
        </div>
      )
    }}
  };
}

ReactDOM.render(<App />, document.getElementById('App'));
