import React from 'react';
import Background from '../components/Background.jsx'

import '../../css/style.css'

const BlobWindow = ({globalTimeOfDay}) => {
  
  return (
    <div>
      <Background 
        globalTimeOfDay={globalTimeOfDay}
      />
    </div>
  )
}

export default BlobWindow;