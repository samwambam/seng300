import React, { Component } from 'react';
import './App.css';


class Profile extends Component {

	render() {
		return (
			<div>
				<div className="Title">My Profile</div>

				<div className="profilepic"> </div>

				<div className="description">
					<h2> Name: ?</h2>
					<h2> Status: ?</h2>
					<h2> GPA: ?</h2>
				</div>

			</div>
		);
	}
}

export default Profile;
