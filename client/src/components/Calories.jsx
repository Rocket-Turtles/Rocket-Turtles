import React from 'react';

const Calories = (props) => {
  let calDisElem = props.calDisplay ? <div>+ {props.nutrients.calories} kcal</div> : <div></div> ;

  return (
    <div className='calories'>
      <div className='caloriesTitle'>Calories</div> 
      <form >
        <label>What did you eat?</label>
        <input type="text" name="calories" onChange={props.handleChange}/>
        <input type="submit" name="calories" onClick={props.handleClick}/>
      </form>

      {calDisElem}
      <div>Today's Total: {props.totalCalories} kcal</div>
    </div>

  )
}

export default Calories;
