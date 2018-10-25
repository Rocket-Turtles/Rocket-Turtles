import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import Sleep from './components/Sleep.jsx';
import UserInput from './components/UserInput.jsx';
import Calories from './components/Calories.jsx';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      // calories
      food: '',

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
  getSleepData() {
    console.log('getSleepData() invoked')
    axios.get('/api/sleep')
    .then(sleepData => {
      console.log(`sleepdata on client is: ${JSON.stringify(sleepData.data)}`)
    })
    .catch(err => {
      console.log(`error getting sleepdata on client: ${sleepData}`)
    });
  };


  render() {
    return(
      <div>
        <UserInput />
        <Calories handleChange={this.handleChange.bind(this)} handleClick={this.handleClick.bind(this)} />
        <Sleep 
          sleepNights={this.state.sleepNights}
        />
      </div>
    )
  };
}

ReactDOM.render(<App />, document.getElementById('App'));
