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
    // checkout https://health.gov/dietaryguidelines/2015/guidelines/appendix-2/
    let totalCalories = this.props.totalCalories;
    let timeOfDay = this.props.globalTimeOfDay;
    let sentence = `(total kcal: ${totalCalories})`

    // 2400 / 3 700 + 300

    if (timeOfDay === 'morning') {
      if (totalCalories < 100) {
        return `You should have more breakfast! ${sentence}`
      } else if (totalCalories < 700) {
        return `Good job! You ate breakfast! ${sentence}`
      } else {
        return `You've had a big breakfast! ${sentence}`
      }
    } else if (timeOfDay === 'afternoon') {
      if (totalCalories < 1400) {
        return `You should have more food! ${sentence}`
      } else if (totalCalories < 1900) {
        return `Good job! You ate lunch! ${sentence}`
      } else {
        return `You've had a big lunch! ${sentence}`
      }

    } else if (timeOfDay === 'evening') {
      if (totalCalories < 2000) {
        return `You should have more food! ${sentence}`
      } else if (totalCalories < 2400) {
        return `Good job! You've ate enough! ${sentence}`
      } else {
        return `You've had a big dinner! ${sentence}`
      }

    } else if (timeOfDay === 'night') {
      if (totalCalories < 2000) {
        return `You should have more food! ${sentence}`
      } else if (totalCalories < 2400) {
        return `Good job! You ate enough! ${sentence}`
      } else {
        return `You ate more than 2400kcals but that's ok! Let's try again next time! ${sentence}`
      }

    } 

  }

  render() {
    return (
      <div>
        I'm {this.state.blob.name}.
        <div className='blob'></div>
        <div>{this.checkSleep()}</div>
        <div>{this.checkCalories()}</div>
      </div>
    )
  }
}

export default Blob;