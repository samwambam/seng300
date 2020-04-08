import React, { Component } from 'react';
import './App.css';


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
	Goes through the list of scholarships that were applied for, and if the scholarship was awarded, it will be given a message of acceptance,
	otherwise, it will get a message of rejection. The list of messages is returned.
	*/
	message =() => {
		let list= [];

		this.props.appliedList.forEach(item => {
			if(item.awarded){
				list.push(<p> Your application for the {item.scholarship_name} scholarship has been accepted</p>)
			}else{
				list.push(<p> Sorry, your application for the {item.scholarship_name} scholarship has not been accepted</p>)
			}
		})
		return list;
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
				Work in progress...
			</div>
		);
	}
}

export default Notifications;
