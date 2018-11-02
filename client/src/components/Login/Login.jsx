import React from 'react';
import CreateProfile from './CreateProfile.jsx'

const Login = ({getUserData, handleUserChange, users, handleViewChange}) => {
  return (
    <div> 
      <CreateProfile
        users={users}
        getUserData={getUserData}
        handleViewChange={handleViewChange}
        handleUserChange={handleUserChange}
      />
      {/* User Select List (artifact from original codebase)*/}
      {/* <div> 
        <select 
          onChange={(e) => handleUserChange(e)}
        >
          <option>Select</option>
          {users.map((user, i) => {
            return <option value={JSON.stringify(user)} key={i}>{user.name}</option>
          })}
        </select>
        </div> */}
    </div> 
  )
}

export default Login;