import React from 'react';

const Calories = (props) => {
  
  return (
    <div>
      <h1>Calories</h1> 
      <form >
        <label>What did you eat?</label>
        <input type="text" onChange={props.handleChange}/>
        <input type="submit" onClick={props.handleClick}/>
      </form>
    </div>

  )
}

export default Calories;
