import React from "react";
import Sleep from "./Sleep.jsx";
import UserProfile from "./UserProfile.jsx";
import Calories from "./Calories.jsx";

//renders the sidebar on the right. user info is static and sleep or nutrition renders depending on view state.
const Sidebar = props => {
  const renderView = viewOption => {
    if (viewOption === "nutrition") {
      //props.getSleepData()
      return (
        <Calories
          totalCalories={props.totalCalories}
          id={props.user.id}
          getCalTotal={props.getCalTotal}
        />
      );
    } else {
      return (
        <Sleep
          user={props.user}
          sleepWeek={props.sleepWeek}
          weeklyAverage={props.weeklyAverage}
          getSleepTime={props.getSleepTime}
          getWakeTime={props.getWakeTime}
          postSleepEntry={props.postSleepEntry}
        />
      );
    }
  };

  return (
    <div>
      <UserProfile user={props.user} globalTimeOfDay={props.globalTimeOfDay} />
      {renderView(props.view)}
    </div>
  );
};



export default Sidebar;
