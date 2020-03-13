import React, { Component } from 'react';
import './Scholarship.css';
// import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
// import Login from './Login';


class Scholarship extends Component {
	
	render() {
    	return (
			<div className="scholarship">
				<div className="container">
					<h1 className = "name"> {this.props.name} </h1>
					<h1 className = "faculty"> {this.props.faculty} </h1>
				</div>
				<div className="container">
					<h1 className = "gpa"> GPA: {this.props.gpa} </h1>
					<h1 className = "deadline"> {this.props.deadline} </h1>
				</div>
			</div>
		);
	}
}

export default Scholarship;
