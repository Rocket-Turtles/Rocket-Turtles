import React from 'react';
import Background from './Background.jsx'
import Blob from './BlobBuddy.jsx'

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