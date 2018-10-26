import React from 'react';

const UserProfile = (props) => {

  const renderWelcome = (timeOfDay) => {
    { if (timeOfDay === 'morning') {
      return (<h2> Good Morning {props.user.name}! </h2>)
    } else if (timeOfDay === 'afternoon') {
      return (<h2> Good Afternoon {props.user.name}! </h2>)
    } else if (timeOfDay === 'evening') {
      return (<h2> Good Evening {props.user.name}! </h2>)
    } else if (timeOfDay === 'night') {
      return (<h2> You should be asleep {props.user.name}! </h2>)
    } else {
      return (<h2> Hello {props.user.name}! </h2>)
    }
    }
  }

  return (
    <div className='userProfile'>

      {renderWelcome(props.globalTimeOfDay)}

      <span className='userData'>
        <div className='userEntry'>Age: {props.user.age}</div>
        <div className='userEntry'>Weight: {props.user.weight}</div>
        <div className='userEntry'>Height: {props.user.height}</div>
      </span>
    </div>
  )
}

export default UserProfile;