import React from 'react';

class Blob extends React.Component {
  constructor(props) {
    super(props);
    this.state= {
      name: 'Blobby',
      calories: 'normal',
      sleep: 'normal'
    }
    this.checkSleep = this.checkSleep.bind(this);
    this.renderBlob = this.renderBlob.bind(this);
    this.setBlobStates = this.setBlobStates.bind(this);
  }

  setBlobStates() {
    let average = this.props.weeklyAverage;
    let totalCalories = this.props.totalCalories;
    if (average < 6) {
      this.setState({
        sleep: 'tired'
      })
    } else if (average >= 6 && average < 10) {
      this.setState({
        sleep: 'normal'
      })
    } else if (average >= 10) {
      this.setState({
        sleep: 'neutral'
      })
    }

    if (totalCalories) {

    }

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

  renderBlob() {
    if (this.state.calories === 'hyper') {
      if (this.state.sleep === 'tired') {
        return (
          <div className='blobContainer'>
            <div className='blobHyperTired'></div>
          </div>
        );
      } else if (this.state.sleep === 'normal') {
        return (
          <div className='blobContainer'>
            <div className='blobHyperNormal'></div>
          </div>
        );
      } else if (this.state.sleep === 'neutral') {
        return (
          <div className='blobContainer'>
            <div className='blobHyperNeutral'></div>
          </div>
        );
      }
    } else if (this.state.calories === 'normal') {
      if (this.state.sleep === 'tired') {
        return (
          <div className='blobContainer'>
            <div className='blobNormalTired'></div>
          </div>
        );
      } else if (this.state.sleep === 'normal') {
        return (
          <div className='blobContainer'>
            <div className='blobNormalHappy'></div>
          </div>
        );
      } else if (this.state.sleep === 'neutral') {
        return (
          <div className='blobContainer'>
            <div className='blobNormalNeutral'></div>
          </div>
        );
      }
    } else if (this.state.calories === 'hungry') {
      if (this.state.sleep === 'tired') {
        return (
          <div className='blobContainer'>
            <div className='blobHungryTired'></div>
          </div>
        );
      } else if (this.state.sleep === 'normal') {
        return (
          <div className='blobContainer'>
            <div className='blobHungryHappy'></div>
          </div>
        );
      } else if (this.state.sleep === 'neutral') {
        return (
          <div className='blobContainer'>
            <div className='blobHungryNeutral'></div>
          </div>
        );
      }
    }
  }

  componentDidMount() {
    this.setBlobStates()
  }

  componentWillReceiveProps() {
    this.setBlobStates()
  }

  render() {
    //this.setBlobStates();
    return (
      <div>
        I'm {this.state.name}.
        <div>
          {this.renderBlob()}
        </div>
        <div>{this.checkSleep()}</div>
        <div>{this.checkCalories()}</div>
      </div>
    )
  }
}

export default Blob;