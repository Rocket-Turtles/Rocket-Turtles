import React from 'react';
import ReactDOM from 'react-dom';
import Sleep from './components/Sleep.jsx';
import axios from 'axios';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      //sleep states:
      sleepNights: []
      
    };
  }

  //sleep methods:
  getSleepData() {
    axios.get('/api/sleep')
    .then(sleepData => {
      console.log(`sleepdata on client is: ${sleepData}`)
    })
    .catch(err => {
      console.log(`error getting sleepdata on client: ${sleepData}`)
    });
  }

  render() {
    return(
      <div>
        hi
        <Sleep />
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('App'));