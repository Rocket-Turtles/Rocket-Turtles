import React from 'react';

const UserProfile = ({user: {name, age, weight, height}, globalTimeOfDay}) => {

  const renderWelcome = (timeOfDay) => {
    { if (timeOfDay === 'morning') {
      return (<h2> Good Morning {name}! </h2>)
    } else if (timeOfDay === 'afternoon') {
      return (<h2> Good Afternoon {name}! </h2>)
    } else if (timeOfDay === 'evening') {
      return (<h2> Good Evening {name}! </h2>)
    } else if (timeOfDay === 'night') {
      return (<h2> You should be asleep {name}! </h2>)
    } else {
      return (<h2> Hello {name}! </h2>)
    }
    }
  }

  return (
    <div className='userProfile'>

      {renderWelcome(globalTimeOfDay)}

      <span className='userData'>
        <div className='userEntry'>Age: {age}</div>
        <div className='userEntry'>Weight: {weight}</div>
        <div className='userEntry'>Height: {height}</div>
      </span>
    </div>
  )
}

export default UserProfile;