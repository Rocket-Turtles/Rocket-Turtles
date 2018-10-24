import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import Sleep from './components/Sleep.jsx';
import Calories from './components/Calories.jsx';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      food: ''

    };

  }

  handleClick(event){
    event.preventDefault();
    // send to server
    console.log('state food', this.state.food)
    axios.post('/calories', {food: this.state.food})
  }

  handleChange(event){
    event.preventDefault();
    event.persist();

    this.setState({
      food: event.target.value
    })

  }

  render() {
    return(
      <div>
        hi
        <Sleep />
        <Calories handleChange={this.handleChange.bind(this)} handleClick={this.handleClick.bind(this)} />
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('App'));