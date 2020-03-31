import React, { Component } from 'react';
import './App.css';


class Profile extends Component {

	render() {

		let info = this.props.info;

		return (
			<div>
				<div className="Title">My Profile</div>

				<div className="profilepic"> </div>

				<div className="description">
					<h2> Name: {info.fname} {info.lname} </h2>
					<h2> Status: {info.status} </h2>
					<h2> GPA: {info.gpa} </h2>
				</div>

			</div>
		);
	}
}

export default Profile;
