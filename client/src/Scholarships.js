import React, { Component } from 'react';
import './App.css';
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import Login from './Login';
import Scholarship from './Scholarship';


class Scholarships extends Component {

	createList = () => {
		let list = []

		// Loop to create all the <li>-s
		// Once the backend API is functional this will change as follows:
		// for (let index = 0; index < arrayOfScholarships.length; index++) {
		for (let index = 0; index < 5; index++) {
			list.push(
				<li>
					<Link to={"/portal/scholarship/" + index}>
						<Scholarship name={"Scholarship " + index} gpa={"3." + index} faculty="Any" deadline="deadline: yesterday" />
					</Link>
					
					{/* link-to goes here */}
				</li>
			)
		}
		console.log(list);
		
		return list

	}

	render() {
    	return (
			<Router>
				<div>
					<h1 className = "Title">Scholarships</h1>
					<ul>
						{this.createList()}
					</ul>
				</div>
			</Router>
		);
	}
}


export default Scholarships;
