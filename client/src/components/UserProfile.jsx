import React from 'react';

const UserProfile = ({user: {name, age, weight, height}}) => {
  return (
    <div className='userProfile'> 
      <h2>Welcome {name}!</h2>
      <span className='userData'>
        <div className='userEntry'>Age: {age}</div>
        <div className='userEntry'>Weight: {weight}</div>
        <div className='userEntry'>Height: {height}</div>
      </span>
    </div>
  )
}

export default UserProfile;