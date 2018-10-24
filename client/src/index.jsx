import React from 'react';
import ReactDOM from 'react-dom';
import Sleep from './components/Sleep.jsx';

class App extends React.Component {
  constructor() {
    super();
    this.state = {

    };
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