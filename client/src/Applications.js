import React, { Component } from 'react';
import './App.css';
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import Login from './Login';


class Applications extends Component {

	render() {
    	return (
			<div>
				<div className = "Title">My Applications</div>
				<ul> {/*unordered list*/}
				  <li>
						Scholarship 1
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

export default Applications;
