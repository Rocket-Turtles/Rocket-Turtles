import React from "react";

//this is the navigation bar/title of the site. It always renders above either the login or blob/user pages.
//it has a handleViewChange function passed down from index.jsx which switches between different views.

const Welcome = props => {
  if (props.view !== "login") {
    return (
      <div>
        <nav>
          <div className="logo">Rocket Turtle</div>
          <div
            className={props.view === "nutrition" ? "navbtnSelected" : "navbtn"}
            onClick={() => props.handleViewChange("nutrition")}
          >
            Nutrition
          </div>
          <div
            className={props.view === "sleep" ? "navbtnSelected" : "navbtn"}
            onClick={() => props.handleViewChange("sleep")}
          >
            Sleep
          </div>

          <div
            className="navbtn"
            onClick={() => props.handleViewChange("friends")}
          >
            Friends
          </div>

          <div
            className="navbtn"
            onClick={() => props.handleViewChange("login")}
          >
            Logout
          </div>
        </nav>
      </div>
    );
  } else {
    return (
      <div>
        <nav>
          <div className="logo">Rocket Turtle</div>
        </nav>
      </div>
    );
  }
};

export default Welcome;
