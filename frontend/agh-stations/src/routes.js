import React from "react";
import {Route} from 'react-router-dom';
import Stations from "./containers/Stations/Stations";
import StationView from "./containers/Stations/StationView";
import Login from "./containers/Login";
import Signup from "./containers/Signup"
import Home from "./containers/home";
import Users from "./containers/Users";

const BaseRouter = (props) => (
    <div>
        <Route exact path='/' component={Home}/>
        <Route exact path='/stations/' render={() => <Stations isAuthenticated={props.isAuthenticated}/>} />
        <Route exact path='/stations/:stationID' component={StationView}/>
        <Route exact path='/login' component={Login} />
        <Route exact path='/signup' component={Signup} />
        <Route exact path='/users' component={Users} />
    </div>
)

export default BaseRouter;
