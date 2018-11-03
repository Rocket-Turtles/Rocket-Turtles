import React from "react";

const Friends = props => {
  // loop over the friends
  return (
    <div>
      <div>
        <select onChange={e => props.handleFriendToAddChange(e)}>
          <option>Select</option>
          {props.users.map((user, i) => {
            return (
              <option value={JSON.stringify(user)} key={i}>
                {user.name}
              </option>
            );
          })}
        </select>
        <input
          type="button"
          value="Add Friend"
          onClick={props.handleAddFriend}
        />
      </div>
      <div>
        {props.friends.map((elem, i) => (
          <div>
            <Friend friend={elem} key={i.toString()} />
            <br />
          </div>
        ))}
      </div>
    </div>
  );
};

const Friend = props => {
  var { name, age, weight, height } = props.friend;
  return (
    <div className="friendsProfile">
      <span className="friendsData">
        <div className="friendEntry">Name: {name}</div>
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
