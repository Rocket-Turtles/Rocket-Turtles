import React from 'react';

class Blob extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Blob: {
        name: ''
      }
    }
  }

  checkSleep() {
    let sleepAverage = this.state.weeklyAverage;

  }

  render() {
    return (
      <div>
        I'm Blob.
        {console.log('Can I read this?', this.props.weeklyAverage)}
      </div>
    )
  }
}

export default Blob;