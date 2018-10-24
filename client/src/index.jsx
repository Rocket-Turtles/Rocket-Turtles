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