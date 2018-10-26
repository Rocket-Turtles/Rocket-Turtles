import React from 'react';
import UserInput from './UserInput.jsx'

import '../../../css/style.css'

const Login = (props) => {
  return (
    <div> 
      <UserInput 
        getUserData={props.getUserData}
      />
    </div>
  )
}

export default Login;