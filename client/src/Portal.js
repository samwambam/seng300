import React, { Component } from 'react';
import './Portal.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Scholarships from './Scholarships';
import Applications from './Applications';
import Profile from './Profile';
import Notifications from './Notifications';



class Portal extends Component {

  render() {

    return (

        <div style={{ margin: 20 + 'pt' }}>

          <div className="logo portal"></div>

          <div className="search">
            <form className="search" method="POST">
              <input type="text" placeholder="Search..."></input>
              <button type="submit">Search</button>
            </form>
          </div>

          
          <Link to='/'>
            <div className="signout"> Sign Out </div>
            <div className="door" > </div>
          </Link>


          <Router>
            <div className='portal'>

              <div className="navigation student">

                <Link to="portal">
                  <div className="menuItem">
                    Scholarships
                            </div>
                </Link>

                <Link to="/portal/applications">
                  <div className="menuItem">
                    My Application
                            </div>
                </Link>

                <Link to="/portal/profile">
                  <div className="menuItem">
                    My profile
                            </div>
                </Link>

                <Link to="/portal/notifications">
                  <div className="menuItem">
                    Notifications
                            </div>
                </Link>

              </div>

              <div className="content">

                <Switch>
                  <Route path='/portal/applications' component={Applications} />
                  <Route path='/portal/profile' component={Profile} />
                  <Route path='/portal/notifications' component={Notifications} />
                  <Route path='/portal/' component={Scholarships} />
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
