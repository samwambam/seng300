import React, { Component } from 'react';
import './Portal.css';
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
//import Login from './Login';
import Scholarships from './Scholarships';
import Applications from './Applications';
import Profile from './Profile';
import Notifications from './Notifications';



class Portal extends Component {

  render() {
    return (
      
      <div style={{margin: 20 + 'pt'}}>
        <header>
            <div className = "logo"></div>
            <div className = "search">
                <form className ="search">
                    <input type="text" placeholder="Search..."></input>
                    <button type="submit">Search</button>
                </form>
            </div>
        </header>
      

      <div className='portal'>  

          <div className = "navigation">

          
            <div className = "scholarship"> 
                <Link to = "portal">Scholarships</Link>
            </div>

            <div className = "applications">
              <Link to="/portal/applications">My Application</Link>
            </div>  

            <div className = "profile"> 
              <Link to="portal/profile">My profile</Link>
            </div>

            <div className = "notifications">
              <Link to="portal/notifications"> Notifications</Link>
            </div>
            
            <div className = "scholarship">
              <Link to='/'> Sign Out </Link>
            </div>

          </div>
          
          <div className="content">
            <Router>

              <Switch>

                <Route path='/portal/applications' exact component = {Applications}/>
                <Route path='/portal/profile' component = {Profile}/>
                <Route path='/portal/notifications' component = {Notifications}/>
                <Route path='/portal/' exact component = {Scholarships}/>
        
              </Switch>    

            </Router>

          </div>

      </div>

        
      </div>

      );
  }
}

export default Portal;
