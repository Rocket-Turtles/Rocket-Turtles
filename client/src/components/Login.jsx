import React from 'react';
import UserSignUp from './UserSignUp.jsx'

import '../../css/style.css'

const Login = ({getUserData, handleUserChange, users, handleViewChange}) => {
  return (
    <div> 
      <UserSignUp
        users={users}
        getUserData={getUserData}
        handleViewChange={handleViewChange}
        handleUserChange={handleUserChange}
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