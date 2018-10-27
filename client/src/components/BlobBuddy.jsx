import React from 'react';

class Blob extends React.Component {
  constructor(props) {
    super(props);
    this.state= {
      blob: {
        name: 'Blobby'
      }
    }
    this.checkSleep = this.checkSleep.bind(this);
  }

  checkSleep() {
    let average = this.props.weeklyAverage;
    if (average === 0) {
      // return `Have you input any sleep data yet? Your sleep average is currently ${average} hours.`;
      return;
    } else if (average < 6) {
      return `You should work on getting enough sleep! Your sleep average is currently ${average} hours.`;
    } else if (average >= 6 && average < 10) {
      return `You're doing good on sleep! Your sleep average is currently ${average} hours.`;
    } else if (average >= 10) {
      return `You've been getting too much sleep! Your sleep average is currently ${average} hours.`;
    }
  }

  checkCalories() {
  }

  render() {
    return (
      <div className='blob'>
        I'm {this.state.blob.name}.
        <url></url>
        <div>{this.checkSleep()}</div>
      </div>
    )
  }
}

export default Blob;