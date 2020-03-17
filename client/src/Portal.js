import React, { Component } from 'react';
import './Portal.css';
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
//import Login from './Login';
import Scholarships from './Scholarships';
import Applications from './Applications';
import Profile from './Profile';
import Notifications from './Notifications';
//import App from './App';



class Portal extends Component {

  render() {
    return (
      
      <div style={{margin: 20 + 'pt'}}>
        
          <div className = "logo portal"></div>

          <div className = "search"> {/*search box and button*/}
              <form className ="search" method = "POST"> 
                  <input type="text" placeholder="Search..."></input>
                  <button type="submit">Search</button>
              </form>
          </div>

          <div className = "signout">
            <Link to='/'> Sign Out </Link>
          </div>

          <Link to='/'> 
            <div  className = "door" > </div>
          </Link>
         
      
      <Router>
      <div className='portal'> 

          <div className = "navigation student"> {/*menu options for student*/}

            <div className = "menuItem"> 
                <Link to = "portal">Scholarships</Link>
            </div>

            <div className = "menuItem">
              <Link to="/portal/applications">My Application</Link>
            </div>  

            <div className = "menuItem"> 
              <Link to="/portal/profile">My Profile</Link>
            </div>

            <div className = "menuItem">
              <Link to="/portal/notifications"> Notifications</Link>
            </div>

          </div>
          
          <div className="content"> {/*this section changes depending on which link we are on*/}
           
              <Switch>
                <Route path='/portal/applications' component = {Applications} />
                <Route path='/portal/profile' component = {Profile}/>
                <Route path='/portal/notifications' component = {Notifications}/>
                <Route path='/portal/' component = {Scholarships}/>
                <Route path='/portal/scholarship/:id' component={Notifications} />
              </Switch>    

          </div>
          
      </div>
      </Router>
        
      </div>

      );
  }
}
export default Portal;
