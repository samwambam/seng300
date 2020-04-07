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
            fetching: true,
            id: 0,
            username: 'x',
            type: 'x',
            details: {},
        }

        this.response = {
            id: 0,
            username: 'x',
            type: 'x',
            details: {},
        }
        
    }


    componentDidMount() {

        let user = localStorage.getItem("userInfo");

        if (user) {
            console.log(user);
            
            user = JSON.parse(user);
            this.setState({ ...user })

        } else {
            fetch('/info')
                .then((res) => res.json())
                .then((res) => {
                    res = res.response
                    // this.setState({ username: res.username, type: res.type })
                    this.response.username =  res.username;
                    this.response.type = res.type;
    
                    
                })
                .then(() => {
                    fetch(`/api/users/${this.response.type}/${this.response.username}`)
                        .then((res) => res.json())
                        .then((res) => {
                            res = res.response[0]
                            // this.setState({id: res.student_id})
                            this.response.id = res.student_id;
                            return res.student_id;
                        })
                        .then((id) => {                        
                            if (this.response.type === 'student') {
                                fetch(`api/students/${this.response.id}`)
                                    .then((res) => res.json())
                                    .then((res) => {
                                        res = res.response[0]
                                        this.response.details = res;
    
                                        this.setState({ ...this.response, fetching: false })
                                        localStorage.setItem("userInfo", JSON.stringify({ ...this.response, fetching: false }))
                                    })
                            }
                        })
    
                })
        }

    }

    componentWillUnmount() {
        localStorage.removeItem("userInfo");
        // TODO handle logout from the server side!!!
    }


    render() {
        console.log(this.state);
        
        if (!this.state.fetching) {

            return (
            
                <div style={{margin: 20 + 'pt'}}>
                    
                    <div className = "logo portal"></div>

                    <Link to='/'> 
                        <div className = "signout"> Sign Out </div>
                        <div className = "door" > </div>
                    </Link>
                    
                
                    <Router>
                        <div className='portal'>  

                            <div className = "navigation student">

                                <Link to = "portal">
                                    <div className = "menuItem"> 
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
                                        My profile
                                    </div>
                                </Link>

                                <Link to="/portal/notifications">
                                    <div className = "menuItem">
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
        } else {
            return(
                <div>fetching</div>
            )
        }
    }

}
export default Portal;
