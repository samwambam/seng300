import React, { Component } from 'react';
import './App.css';


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
