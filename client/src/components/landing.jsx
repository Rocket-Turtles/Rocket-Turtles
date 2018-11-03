import React from "react";
import Auth from "../auth.js";
//import router
//import auth0

//const auth = new Auth();

const Landing = () => (
  <React.Fragment>
    <header>
      <h1 className="lpheader">TO-BE-DETERMINED</h1>
      <button className="lptopbutton" onClick = {()=>{
        auth.login()}}>Resume your Journey</button>
    </header>
    <div className="lpfirst">
      <h1>Are you feeling at the top of your game?</h1>
    </div>
    <div className="lpfirstbox">
      <img className="hungry" />
      <div className="lpfmess">
        Have you been having that feeling in the pit of your stomach?
      </div>
    </div>
    <div className="lpsecondbox">
      <img className="tired" />
      <div className="lpsmess">
        Have you been getting through the day without running out of energy?
      </div>
    </div>
    <div className="lpthirdbox">
      <h1 className="lptmess">THEN YOU'RE IN THE RIGHT PLACE!</h1>
    </div>
    <div className="lpfinalbox">
      <h2>
        Take back control of your life with our interactive health management
        system!
      </h2>
    </div>
    <button className="lpbottombutton" onClick={Auth.login}>
      GET STARTED HERE!
    </button>

    <footer className="lpfooter">
      <h1>DISCLAIMER</h1>
    </footer>
  </React.Fragment>
);
export default Landing;
