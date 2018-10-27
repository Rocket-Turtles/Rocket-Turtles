import React from 'react';
import UserInput from './UserSignUp.jsx'

import '../../css/style.css'

const Login = ({getUserData, handleUserChange, users, handleViewChange}) => {
  return (
    <div> 
      <UserInput 
        getUserData={getUserData}
        handleViewChange={handleViewChange}
      />
      <select 
        onChange={(e) => handleUserChange(e)}
        onClick={() => handleViewChange('nutrition')}>
        <option>Select</option>
        {users.map((user, i) => {
          return <option value={JSON.stringify(user)} key={i}>{user.name}</option>
        })}
      </select>
    </div>
  )
}

export default Login;