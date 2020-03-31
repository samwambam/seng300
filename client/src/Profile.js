import React, { Component } from 'react';
import './App.css';


class Profile extends Component {
	
	capitalize = (stringInput) => {
		let str = stringInput.toString()		
		return str.charAt(0).toUpperCase() + '' + str.slice(1)
	}
	
	render() {

		let info = this.props.info;

		return (
			<div>
				<div className="Title">My Profile</div>

				<div className="profilepic"> </div>

				<div className="description">
					<h2> Name: {this.capitalize(info.fname)} {this.capitalize(info.lname)} </h2>
					<h2> Status: {this.capitalize(info.status)} </h2>
					<h2> GPA: {info.gpa} </h2>
				</div>

			</div>
		);
	}
	
	

}



export default Profile;
