import React from "react";
import Auth from "../auth.js";
import { NavLink } from "react-router-dom";
//this is the navigation bar/title of the site. It always renders above either the login or blob/user pages.
//it has a handleViewChange function passed down from index.jsx which switches between different views.

const auth = new Auth();

const Welcome = props => {
  if (props.view !== "login") {
    return (
      <div>
        <nav>
          <div className="logo">Rocket Turtle</div>
          <div
            className={
              props.view.viewUserOrFriends === "friends"
                ? "navbtnSelected"
                : "navbtn"
            }
            onClick={() => props.handleViewUserOrFriendsChange("friends")}
          >
            Friends
          </div>

          <div
            id="leftSideStuff"
            className={
              props.view.viewUserOrFriends === "user"
                ? "navbtnSelected"
                : "navbtn"
            }
            onClick={() => props.handleViewUserOrFriendsChange("user")}
          >
            Profile
          </div>
          <div
            className={
              props.view.view === "nutrition" ? "navbtnSelected" : "navbtn"
            }
            onClick={() => props.handleViewChange("nutrition")}
          >
            Nutrition
          </div>
          <div
            id="rightSideStuff"
            className={
              props.view.view === "sleep" ? "navbtnSelected" : "navbtn"
            }
            onClick={() => props.handleViewChange("sleep")}
          >
            Sleep
          </div>
          <div
            className="navbtn"
            onClick={() => {
              console.log("Logout clicked");
              auth.logout();
            }}
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
