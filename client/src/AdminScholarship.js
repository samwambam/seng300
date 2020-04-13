import React, { Component } from 'react';
import './AdminScholarship.css';



class AdminScholarship extends Component {
	/*
	Sets up the format of how scholarships will be displayed 
	*/

	render() {
    	return (
			<div className="scholarship">
				
				<div className="container">
					<h3 className = "name"> {this.props.name} </h3>
					<h3 className = "faculty"> {this.props.faculty} </h3>
				</div>

				<div className="container">
					<h3 className = "gpa"> GPA: {this.props.gpa} </h3>
					<h3 className = "deadline">{this.props.awarded ? "Awarded" : this.props.deadline}</h3>
				</div>

                <div className="container">
					<button className = "delete-btn">Delete</button>
				</div>

			</div>
		);
	}
}

export default AdminScholarship;
