import React from 'react';
import axios from 'axios';

class Calories extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      food: '',  // food input from user
      calDisplay: false,  // whether to display retrieved calories from USDA
      nutrients: {},  // obj received from USDA API
      totalCalories: props.totalCalories,  // total amount of kcal consumed today
      
    }
    this.onSubmit = this.onSubmit.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.handleChange = this.handleChange.bind(this);

  }
  
  handleClick(event){
    event.preventDefault();
    
    // send to server
    axios.post('/api/calories', {food: this.state.food, user: this.props.id})
    .then((res) => {

      // display on screen
      this.setState({
        calDisplay: true,
        nutrients: res.data,
        totalCalories: res.data.calories ? this.props.totalCalories + res.data.calories : this.props.totalCalories
      })
    })
    .catch((err) => {
      console.error('ERROR sending post request to /api/calories/', err)
    }).then(() => {
      
      // send total calories to parent
      this.props.getCalTotal(this.state.totalCalories)
    })

  }

  handleChange(e){
    this.props.handleBlobConditionChange();
    e.preventDefault();
    e.persist();
    this.setState({
      food: e.target.value
    })
  };
  onSubmit(e) {

    this.handleClick(e);
    this.props.eat();

  }

  render(){
    let totalCal = this.props.totalCalories;
    let calDisElem = this.state.calDisplay ? <div>+ {this.state.nutrients.calories} kcal</div> : <div></div> ;
    
    return (
      <div className='calories'>
        <div className='caloriesTitle'>Calories</div> 
        <form >
          <label>What did you eat?</label>

          <input type="text" name="calories" onChange={this.handleChange.bind(this)}/>
          <input type="submit" name="calories" onClick={this.onSubmit.bind(this)}/>
        </form>
        {calDisElem}
        <div>Today's Total: {totalCal} kcal</div>
      </div>
    )
  }
} 

export default Calories;
