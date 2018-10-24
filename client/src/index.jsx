import React from 'react';
import ReactDOM from 'react-dom';
import Sleep from './components/Sleep.jsx';
import axios from 'axios';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
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
  }

  componentDidMount() {
    this.getSleepData();
  }

  render() {
    return(
      <div>
        hi
        <Sleep 
          sleepNights={this.state.sleepNights}
        />
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('App'));