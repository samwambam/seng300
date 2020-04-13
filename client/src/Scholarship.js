import React, { Component } from 'react';
import './Scholarship.css';
// import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
// import Login from './Login';


class Scholarship extends Component {
	/*
	Sets up the format of how scholarships will be displayed 
	*/

	render() {
    	return (
			<div className="scholarship">
				
				<div className="container">
					<h3 className = "name"> {this.props.name + "  ($" + this.props.amount +")"} </h3>
					<h3 className = "faculty"> {this.props.faculty} </h3>
				</div>

				<div className="container">
					<h3 className = "gpa"> GPA: {this.props.gpa} </h3>
					<h3 className = "deadline">{this.props.awarded ? "Awarded" : this.props.deadline}</h3>
				
				</div>

			</div>
		);
	}
}

export default Scholarship;
