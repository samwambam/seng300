import React, { Component } from 'react';
import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Portal from './Portal';
import Login from "./Login";

class App extends Component {
    /*
    If the url ends with /login or /, then we will be taken to the login page.
    If the url ends with /portal, then we will be taken to the main page.
    */
    render() {
        return (
            <Router> 
                <Switch>
                <Route path='/login' exact component = {Login} /> 
                <Route path='/portal' component = {Portal} /> 
                <Route path='/' component={Login} /> 
                </Switch>
            </Router>
        );
    }

}

export default App;
