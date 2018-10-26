import React from 'react';

class Blob extends React.Component {
  constructor(props) {
    super(props);
    this.state = props.state;
    this.state.blob = {
      name: 'Blobby'
    }
    this.checkSleep = this.checkSleep.bind(this);
  }

  checkSleep() {
    if (this.state.weeklyAverage === 0) {
      return `Have you input any sleep data yet? Your sleep average is currently ${this.state.weeklyAverage}`;
    }
  }

  render() {
    return (
      <div>
        I'm {this.state.blob.name}.
        {/* {console.log('Can I read this?', this.state.weeklyAverage)} */}
        <div>{this.checkSleep()}</div>
      </div>
    )
  }
}

export default Blob;