import React from "react";
import {Route} from 'react-router-dom';
import Stations from "./containers/Stations";
import StationView from "./containers/StationView";
import Login from "./containers/Login";
import Signup from "./containers/Signup"
import Home from "./containers/home";

const BaseRouter = (props) => (
    <div>
        <Route exact path='/' component={Home}/>
        <Route exact path='/stations/' render={() => <Stations isAuthenticated={props.isAuthenticated}/>} />
        <Route exact path='/stations/:stationID' component={StationView}/>
        <Route exact path='/login' component={Login} />
        <Route exact path='/signup' component={Signup} />
    </div>
)

export default BaseRouter;
