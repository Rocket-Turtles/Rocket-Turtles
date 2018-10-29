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
      {/* User Select List */}
      <div>
        <select 
          onChange={(e) => handleUserChange(e)}
        >
          <option>Select</option>
          {users.map((user, i) => {
            return <option value={JSON.stringify(user)} key={i}>{user.name}</option>
          })}
        </select>
      </div>
    </div>
  )
}

export default Login;