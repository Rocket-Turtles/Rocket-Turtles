import React from 'react';

const UserProfile = ({user: {name, age, weight, height}}) => {
  return (
    <div> 
      <h3>User Profile</h3>
      <span>
        <div>Name: {name}</div>
        <div>Age: {age}</div>
        <div>Weight: {weight}</div>
        <div>Height: {height}</div>
      </span>
    </div>
  )
}

export default UserProfile;