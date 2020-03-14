import React, { Component } from 'react';
import './Scholarship.css';
// import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
// import Login from './Login';


class Scholarship extends Component {
	
	render() {
    	return (
			<div className="scholarship">
				<div className="container">
					<h3 className = "name"> {this.props.name} </h3>
					<h3 className = "faculty"> {this.props.faculty} </h3>
				</div>
				<div className="container">
					<h3 className = "gpa"> GPA: {this.props.gpa} </h3>
					<h3 className = "deadline"> {this.props.deadline} </h3>
				</div>
			</div>
		);
	}
}

export default Scholarship;
