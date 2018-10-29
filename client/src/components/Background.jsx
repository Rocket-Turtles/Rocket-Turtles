import React from 'react';

import '../../css/style.css'

//we were going to have a background for the blob that dynamically changed based on time of day.
//this is currently unused. 

const Background = ({globalTimeOfDay}) => {
  
  return (
    <div className='background'>
      <div className='bgsky'>

      </div>
    </div>
  )
}

export default Background;