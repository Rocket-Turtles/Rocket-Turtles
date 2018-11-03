import React from 'react';
import CreateProfile from './CreateProfile.jsx'
import axios from 'axios';



const Login = ({getUserData, handleUserChange, users, handleViewChange}) => {
  console.log('GET sent to /api/profiles/', localStorage.name);
  axios
    .get('/api/profiles/' + localStorage.name)
    .then(function(response) {
      console.log('profile match?', response.data);
      if(response.data.length > 0){
        console.log('SETTING USER TO', response.data[0]);
        handleUserChange(response.data[0]);
      }
      //use handleViewChange to set state
    })
    .catch((err)=>(console.log('error getting profile', err)));
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