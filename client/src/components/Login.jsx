import React from 'react';
import UserInput from './UserInput.jsx'

import '../../../css/style.css'

const Login = (props) => {
  return (
    <div> 
      <UserInput 
        handleNewUserSubmit={props.handleNewUserSubmit}
        handleNumber={props.handleNumber}
        user={props.user}
      />
    </div>
  )
}

export default Login;