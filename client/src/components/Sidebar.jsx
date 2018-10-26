import React from 'react';
import Sleep from './Sleep.jsx';
import UserProfile from './UserProfile.jsx';
import Calories from './Calories.jsx';
//import Login from './Login.jsx'

import '../../../css/style.css'



const Sidebar = (props) => {

  const renderView = (viewOption) => {
    if (viewOption === 'nutrition') {
      return (<Calories 
        handleChange={props.handleChange} 
        handleClick={props.handleClick} 

      />
      // {/* {calDisElem}
      // <br></br> */}
      )
    } else {
      return (<Sleep 
        sleepWeek={props.sleepWeek}
        weeklyAverage={props.weeklyAverage}
        getSleepTime={props.getSleepTime}
        getWakeTime={props.getWakeTime}
        postSleepEntry={props.postSleepEntry}
      />)
    }
  }

  return (
    <div>
      <UserProfile 
        user={props.user}
      />
    {renderView(props.view)}  
      
      
      
    </div>
  )
}

export default Sidebar;