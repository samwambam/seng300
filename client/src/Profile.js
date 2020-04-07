import React, { Component } from 'react';
import './App.css';


class Profile extends Component {
	
	constructor(props) {
		super(props);

		this.state = {
			info: this.props.info
		}
	}


	capitalize = (stringInput) => {
		let str = stringInput.toString()		
		return str.charAt(0).toUpperCase() + '' + str.slice(1)
	}


	// apply = () => {
	// 	fetch('/api/scholarships/apply/123456/111111', {
	// 		method: 'post'
	// 	})
	// }
	
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
