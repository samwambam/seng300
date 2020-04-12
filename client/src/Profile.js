import React, { Component } from 'react';
import './App.css';


class Profile extends Component {
	/*
	The users information is displayed
	*/

	constructor(props) {
		super(props);

		this.state = {
			info: this.props.info
		}
	}

	/*
	The first character of the parameter stringInput is converted to uppercase, and the whole string is returned 
	*/
	capitalize = (stringInput) => {
		let str = stringInput.toString()		
		return str.charAt(0).toUpperCase() + '' + str.slice(1)
	}

	
	render() {

		return (
			<div>
				<h1 className="Title">My Profile</h1>

				<div className="profilepic"> </div>

				<div className="description">
					<h2> Name: {this.capitalize(this.state.info.fname)} {this.capitalize(this.state.info.lname)} </h2>
					<h2> Status: {this.capitalize(this.state.info.status)} </h2>
					<h2> GPA: {this.state.info.gpa} </h2>
				</div>

			</div>
		);
	}
	
	

}



export default Profile;
