import React, { Component } from 'react';
import './Portal.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Scholarships from './Scholarships';
import Applications from './Applications';
import Profile from './Profile';
import Notifications from './Notifications';
import CreateScholarship from './CreateScholarship';



class Portal extends Component {

    constructor(props) {
        super(props);

        this.state = {
            fetching: true,
            id: 0,
            username: 'x',
            type: 'x',
            details: {},
            appliedFor: [],
        }

        this.response = {
            id: 0,
            username: 'x',
            type: 'x',
            details: {},
            appliedFor: [],
        }
        
        this.handleAppliedUpdate = this.handleAppliedUpdate.bind(this);
    }


    componentDidMount() {

        let user = localStorage.getItem("userInfo");

        if (user) {
            console.log(user);
            
            user = JSON.parse(user);
            this.setState({ ...user })

        } else {
            // Get all the necessary information about the user
            // 1. get their username and type
            fetch('/info')
                .then((res) => res.json())
                .then((res) => {
                    res = res.response
                    // this.setState({ username: res.username, type: res.type })
                    this.response.username =  res.username;
                    this.response.type = res.type;                    
                })
                .then(() => {
                    if (this.response.type === "admin") {
                        this.setState({ ...this.response, fetching: false })
                        localStorage.setItem("userInfo", JSON.stringify({ ...this.response, fetching: false }))
                    } else {
            // 2. if they're a student, get their id
                        fetch(`/api/users/${this.response.type}/${this.response.username}`)
                            .then((res) => res.json())
                            .then((res) => {
                                res = res.response[0]
                                this.response.id = res.student_id;
                                return res.student_id;
                            })
                            .then((id) => {
            // 3. if they're a student, get an additional set of info containing faculty, program, gpa, etc.
                                if (this.response.type === 'student') {
                                    fetch(`api/students/${this.response.id}`)
                                        .then((res) => res.json())
                                        .then((res) => {
                                            res = res.response[0]
                                            this.response.details = res;
                                        })
            // 4. while we're at it, grab all the scholarships they've applied for
                                        .then(() => {
                                            fetch('/api/scholarships/applied/' + id)
                                                .then((res) => res.json())
                                                .then((res) => {
                                                    // res = res.response
                                                    this.response.appliedFor = res.response;
                                                    // this.setState({scholarships: response.response, scholarshipsToDisplay: response.response})
                                                    this.setState({ ...this.response, fetching: false })
                                                    localStorage.setItem("userInfo", JSON.stringify({ ...this.response, fetching: false }))
                                                })
                                        })
                                } else {
                                    this.setState({ ...this.response, fetching: false })
                                    localStorage.setItem("userInfo", JSON.stringify({ ...this.response, fetching: false }))
                                }
                            })
                    }
                })
        }
    }

    componentWillUnmount() {
        localStorage.removeItem("userInfo");
        // TODO handle logout from the server side!!!
    }


    handleAppliedUpdate() {
        fetch('/api/scholarships/applied/' + this.state.id)
            .then((res) => res.json())
            .then((res) => {
                this.response.appliedFor = res.response;

                this.setState({ ...this.response, fetching: false })
                localStorage.setItem("userInfo", JSON.stringify({ ...this.response, fetching: false }))
            })

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
                            {
                                this.state.type === "student" && 
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
                                                My Profile
                                            </div>
                                        </Link>

                                        <Link to="/portal/notifications">
                                            <div className = "menuItem">
                                                Notifications
                                            </div>
                                        </Link>

                                    </div>
                            }

                            {
                                this.state.type === "admin" && 
                                    <div className = "navigation student">
                                        <Link to = "/portal/addnew">
                                            <div className = "menuItem"> 
                                                Add Scholarship
                                            </div>
                                        </Link>

                                        <Link to="/portal/applications">
                                            <div className = "menuItem">
                                                View Applicants
                                            </div>  
                                        </Link>
                                    </div>
                            }
                            
                            
                            <div className="content">
                                {
                                    this.state.type === "student" && 
                                        <Switch>
                                            <Route
                                                path='/portal/applications'
                                                render={(props) => <Applications {...props} list={this.state.appliedFor} />}
                                            />
                                            <Route
                                                path='/portal/profile'
                                                render={(props) => <Profile {...props} info={this.state.details} />}
                                            />
                                            <Route
                                                path='/portal/notifications'
                                                render = {(props) => <Notifications {...props} appliedList={this.state.appliedFor} />}
                                            />
                                            <Route
                                                path='/portal/'
                                                render={(props) => <Scholarships {...props} student={this.state.details} appliedList={this.state.appliedFor} updateApplied={this.handleAppliedUpdate} />}
                                            />
                                        </Switch>    
                                }
                                {
                                    this.state.type === "admin" &&
                                        <Switch>
                                            <Route 
                                                path='/portal/addnew'
                                                component = {CreateScholarship}
                                            />
                                        </Switch>  
                                }

                            </div>
                            
                        </div>
                    </Router>
                    
                </div>

            )

        } else {
            return(
                <div>fetching...</div>
            )
        }
    }

}
export default Portal;