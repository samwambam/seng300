import React, { Component } from 'react';
import './Portal.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Scholarships from './Scholarships';
import Applications from './Applications';
import Profile from './Profile';
import Notifications from './Notifications';



class Portal extends Component {

    constructor(props) {
        super(props);

        this.state = {
            id: 0,
            username: 'x',
            type: 'x',
            details: {},
        }
        


    }

    componentDidMount(){    /*get the user information from server after components are rendered*/
        this.getUserInfo();

    }

    getUserInfo() {
        fetch('/info')  /*returns the last recorded username and user type*/
            .then((res) => res.json()) /*changes the user information to json format*/
            .then((res) => {
                res = res.response  /*sets res to be the user information we are intersted in: username, password, type, id*/
                this.setState({ username: res.username, type: res.type })
            })
            .then(() => {
                fetch(`/api/users/${this.state.type}/${this.state.username}`) /*returns the user id by username*/
                    .then((res) => res.json()) /*changes this information to json format */
                    .then((res) => {    
                        res = res.response[0]   /*sets res to be the first element of the array of the response key*/
                        this.setState({id: res.student_id})
                        return res.student_id;
                    })
                    .then((id) => {                        
                        if (this.state.type === 'student') {
                            fetch(`api/students/${this.state.id}`)  /*returns information about the student*/
                                .then((res) => res.json()) /*changes the information to json format*/
                                .then((res) => {
                                    res = res.response[0]   /*sets res to be the first element of the array of the response key: all the information of the student we are interseted in*/
                                    this.setState({ details : res}) 
                                })
                        }
                    })

            })
    }

    render() {
        
        return (
        
            <div style={{margin: 20 + 'pt'}}>
                
                <div className = "logo portal"></div>

                <Link to='/'> 
                    <div className = "signout"> Sign Out </div>
                    <div className = "door" > </div>
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
                            <div className = "menuItem">
                                My Applications
                            </div>  
                        </Link>

                        <Link to="/portal/profile">
                            <div className = "menuItem"> 
                                My Profile
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
                            {/* {console.log(this.state)} */}
                            <Route
                                path='/portal/applications'
                                render={(props) => <Applications {...props} id={this.state.id} />}
                            />
                            <Route
                                path='/portal/profile'
                                render={(props) => <Profile {...props} info={this.state.details} />}
                            />
                            <Route
                                path='/portal/notifications'
                                component = {Notifications}
                            />
                            <Route
                                path='/portal/'
                                component = {Scholarships}
                            />
                        </Switch>    

                    </div>
                    
                </div>
            </Router>
                
            </div>
      );
  }
}
export default Portal;
