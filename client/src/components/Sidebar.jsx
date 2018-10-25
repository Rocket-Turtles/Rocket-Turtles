import React from 'react';
import Sleep from './Sleep.jsx';
import UserProfile from './UserProfile.jsx';
import Calories from './Calories.jsx';
//import Login from './Login.jsx'

import '../../../css/style.css'

const Sidebar = (props) => {
  return (
    <div> 
      <UserProfile user={props.user}/>
      <Calories 
        handleChange={props.handleChange} 
        handleClick={props.handleClick} />
      {/* {calDisElem}
      <br></br> */}
      <Sleep 
        sleepWeek={props.sleepWeek}
        weeklyAverage={props.weeklyAverage}
        getSleepTime={props.getSleepTime}
        getWakeTime={props.getWakeTime}
        postSleepEntry={props.postSleepEntry}
      />
    </div>
  )
}

export default Sidebar;