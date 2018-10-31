import { BrowserRouter, Route, Switch } from 'react-router-dom';
import React from "react";
import ReactDOM from "react-dom";
import Welcome from "./components/Welcome.jsx";
import "../css/style.css";
import CreateProfile from "./components/Login/CreateProfile.jsx";

const AppRouter = () => (
    <BrowserRouter> 
    <main>
        <Switch>
            <Route exact path="/" component={Welcome} />
            <Route path="/home" Component={Home} />
            <Route path="/create" component={CreateProfile} />
            <Route Component={Welcome} />
        </Switch>
    </main>
    </BrowserRouter>
)
ReactDOM.render(<AppRouter />, document.getElementById("App"));