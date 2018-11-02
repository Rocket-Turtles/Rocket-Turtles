import React from "react";

const Friends = props => {
  // loop over the friends
  return props.friends.map(elem => {
    return (
      <div>
        <Friend friend={elem} />
        <br />
      </div>
    );
  });
};

const Friend = props => {
  debugger;
  var { age, weight, height } = props.friend.friend;
  return (
    <div className="friendsProfile">
      <span className="friendsData">
        <div className="friendEntry">Age: {age}</div>
        <div className="friendEntry">Weight: {weight} lbs</div>
        {/* height is stored as a decimal in db so this line is used to turn in back into a foot/inches value */}
        <div className="friendEntry">
          Height:{" "}
          {Math.floor(height) +
            "'" +
            Math.floor((height - Math.floor(height)) * 12) +
            '"'}
        </div>
      </span>
    </div>
  );
};

export default Friends;
