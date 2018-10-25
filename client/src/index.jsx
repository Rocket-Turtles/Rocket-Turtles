import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import Sleep from './components/Sleep.jsx';
import Calories from './components/Calories.jsx';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      // calories
      food: '',

      // after user signs in --> go to DB and check if we have user in database --> if user exists --> bring back user id --> else --> insert user in DB and retrieve user id
      userID: '',

      //sleep states:
      sleepNights: [{
        id: 1,
        user: 1,
        hourCount: 8,
        startHour: '14:05:00',
        endHour: '22:05:00',
        nightSlept: '2018-08-22'
      }]
    };
    
    this.getSleepData = this.getSleepData.bind(this);
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
  getSleepData() {
    axios.get('/api/sleep')
    .then(sleepData => {
    })
    .catch(err => {
    });
  };


  render() {
    return(
      <div>
        hi
        <Calories handleChange={this.handleChange.bind(this)} handleClick={this.handleClick.bind(this)} />
        <Sleep 
          sleepNights={this.state.sleepNights}
        />
      </div>
    )
  };
}

ReactDOM.render(<App />, document.getElementById('App'));
