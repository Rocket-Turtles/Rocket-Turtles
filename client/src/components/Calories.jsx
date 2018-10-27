import React from 'react';
import axios from 'axios';

class Calories extends React.Component {
  constructor(props) {
    super(props);

<<<<<<< HEAD
  return (
    <div className='calories'>
      <div className='caloriesTitle'>Calories</div> 
      <form >
        <label>What did you eat?</label>
        <input type="text" name="calories" onChange={props.handleChange}/>
        <input type="submit" name="calories" onClick={props.handleClick}/>
      </form>
=======
    this.state = {
      food: '',  // food input from user
      calDisplay: false,  // whether to display retrieved calories from USDA
      nutrients: {},  // obj received from USDA API
      totalCalories: props.totalCalories,  // total amount of kcal consumed today
      
    }
>>>>>>> refactor calories

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
        totalCalories: res.data.calories ? this.state.totalCalories + res.data.calories : this.state.totalCalories
      })
    })
    .catch((err) => {
      console.log('>>>> ERROR in axios post request for USDA cal', err)
    })

  }

  handleChange(event){
    event.preventDefault();
    event.persist();

    this.setState({
      food: event.target.value
    })
  };


  render(){
    let totalCal = this.state.totalCalories ? this.state.totalCalories : this.props.totalCalories;
    let calDisElem = this.state.calDisplay ? <div>+ {this.state.nutrients.calories} kcal</div> : <div></div> ;
    
    return (
      <div className='calories'>
        <h1>Calories</h1> 
        <form >
          <label>What did you eat?</label>
          <input type="text" name="calories" onChange={this.handleChange.bind(this)}/>
          <input type="submit" name="calories" onClick={this.handleClick.bind(this)}/>
        </form>

        {calDisElem}
        <div>Today's Total: {totalCal} kcal</div>
      </div>

    )
  }

} 

export default Calories;
