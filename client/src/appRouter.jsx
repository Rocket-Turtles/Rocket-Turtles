import { BrowserRouter, Route, Switch } from "react-router-dom";
import React from "react";
import ReactDOM from "react-dom";
import Welcome from "./components/landing.jsx";
import "../css/style.css";
import CreateProfile from "./components/Login/Login.jsx";
import Home from "./index.jsx";

const AppRouter = () => (
  <BrowserRouter>
    <main>
      <Switch>
        <Route path="/home" component={Home} />
        <Route path="/" component={Welcome} />
      </Switch>
    </main>
  </BrowserRouter>
);
ReactDOM.render(<AppRouter />, document.getElementById("App"));
