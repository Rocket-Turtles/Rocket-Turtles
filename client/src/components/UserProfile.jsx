import React from 'react';

const UserProfile = ({user: {name, age, weight, height}, globalTimeOfDay}) => {

  //renders a dynamic user greeting message based on time of day
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
        <div className='userEntry'>Weight: {weight} lbs</div>
        {/* height is stored as a decimal in db so this line is used to turn in back into a foot/inches value */}
        <div className='userEntry'>Height: {Math.floor(height) + '\'' + Math.floor((height - Math.floor(height)) * 12) + '\"'}</div>
      </span>
    </div>
  )
}

export default UserProfile;