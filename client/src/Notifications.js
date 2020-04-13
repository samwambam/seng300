import React, { Component } from 'react';
import './App.css';
import Scholarship from './Scholarship'


class Notifications extends Component {
	/*
	Messages will be sent to the student indicating the status of their applications for scholarships 
	*/

	constructor(props){
		super(props);
		this.state={
			scholarships: [], //the list of scholarships that were applied for
		}
	}

	/*
	The first character in parameter stringInput is converted to uppercase, and the whole string is returned
	*/
	capitalize = (stringInput) => {
		let str = stringInput.toString()		
		return str.charAt(0).toUpperCase() + '' + str.slice(1)
	}

	/*
	The parameter dateString is converted to Universal Coordinated Time format and returned
	*/
	getDisplayDate = (dateString) => {
		let date = new Date(dateString)
		return date.toUTCString().slice(0,11)
	}
	
	/*
	Goes through the list of scholarships that were applied for, and if the scholarship was awarded, it will be given a message of acceptance,
	otherwise, it will get a message of rejection. The list of messages is returned.
	*/
	message =() => {
		let list= [];

		this.props.appliedList.forEach(item => {
			if(item.awarded){
				list.push(<li> 
							Your application for the {item.scholarship_name} scholarship has been accepted
							<Scholarship
								name={item.scholarship_name}
								gpa={item.min_gpa}
								faculty={"Faculty: " + this.capitalize(item.offering_faculty)}
								deadline={this.getDisplayDate(item.deadline)}
								awarded={item.awarded}
							/>	
						</li>)
			}else{
				list.push(<li> 
							Sorry, your application for the {item.scholarship_name} scholarship has not been accepted
							<Scholarship
								name={item.scholarship_name}
								gpa={item.min_gpa}
								faculty={"Faculty: " + this.capitalize(item.offering_faculty)}
								deadline={this.getDisplayDate(item.deadline)}
								awarded={item.awarded}
							/>
						</li>)
			}
		})
		return list;
	}

	appliedList() {
		fetch('/api/award/:student_id/:scholarship_id')	//returns the scholarships from database
			.then((res) => res.json())	//changes the scholarships information to json format
			.then((response) => {	
				this.setState({scholarships: response.response}) //puts the scholarship information in array
			})
	}
	


	render() {
    	return (
			<div>
				<h1 className = "Title">Notifications</h1>
				
				{/* <ul>
				  <li>
						Scholarship 1
					</li>
					<li>
						Scholarship 2
					</li>
				</ul> */
				}

				<ul className= "notif">
				{this.message()}
				</ul>
				
			</div>
		);
	}
}

export default Notifications;
