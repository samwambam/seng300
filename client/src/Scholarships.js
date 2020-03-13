import React, { Component } from 'react';
import './App.css';
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import Login from './Login';
import Scholarship from './Scholarship';


class Scholarships extends Component {


	render() {
    	return (
			<div>
				<div className = "Title">Scholarships</div>
				<ul>
					<li>
						
						<Scholarship name="Scholarship 1" gpa="2.4" faculty="Science" deadline="tomorrow" />
					{/* link to goes here */}
			
					</li>

					<li>
						
						Scholarship 2

					</li>
					<li>

						Scholarship 3

					</li>

				</ul>
			</div>
		);
	}
}


export default Scholarships;
