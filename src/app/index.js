import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";

import Login from './components/Login';
import Routes from './routes';
import Register from './components/Register';

export default class App extends Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path="/">
                        <Login />
                    </Route>
                    <Route exact path="/register">
                        <Register />
                    </Route>
                    <Route path="/" >
                        <Routes />
                    </Route>
                </Switch>
            </Router >
        );
    }
}
