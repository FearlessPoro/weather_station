import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import {applyMiddleware, compose, createStore} from "redux";
import thunk from "redux-thunk";
import reducer from "./store/reducers/auth";
import {Provider} from "react-redux";
import Helmet from "react-helmet";

const composeEnhances = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(reducer, composeEnhances(
    applyMiddleware(thunk)
));


ReactDOM.render(
    <Provider store={store}>
        <Helmet>
            <meta charSet="utf-8"/>
            <title>Stacje pomiarowe AGH</title>


        </Helmet>
        <App/>
    </Provider>,
    document.getElementById('root'));
serviceWorker.register();