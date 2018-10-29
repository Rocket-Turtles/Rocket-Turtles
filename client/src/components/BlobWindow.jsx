import React from 'react';
import Background from '../components/Background.jsx'
import Blob from '../components/BlobBuddy.jsx'

import '../../css/style.css'

const BlobWindow = ({globalTimeOfDay, weeklyAverage, totalCalories}) => {
  
  return (
    <div>
      <Background 
        globalTimeOfDay={globalTimeOfDay}
      />
      <Blob 
        weeklyAverage={weeklyAverage}
        totalCalories={totalCalories}
        globalTimeOfDay={globalTimeOfDay}
      />
    </div>
  )
}

export default BlobWindow;