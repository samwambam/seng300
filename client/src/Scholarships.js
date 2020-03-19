import React, { Component } from 'react';
import './App.css';
import Scholarship from './Scholarship';
import Modal from "react-modal";


class Scholarships extends Component {

	constructor(props) {
		super(props);
		this.state = {
			modalOpen: false,
			selectedName: "You shouldn't be here",
			selectedGpa:  "You shouldn't be here",
			selectedFaculty:  "You shouldn't be here",
			selectedDeadline: "You shouldn't be here",
		}
	}

	createList = () => {
		let list = []

		// Loop to create all the <li>-s
		// Once the backend API is functional this will change as follows:
		// for (let index = 0; index < arrayOfScholarships.length; index++) 
		// <li>
		// 	<Link to={"/portal/scholarship/" + index}>
		// 		<Scholarship name={"Scholarship " + index} gpa={"3." + index} faculty="Any" deadline="yesterday" />
		// 	</Link>
			
		// 	{/* link-to goes here */}
		// </li>
		for (let index = 0; index < 5; index++) {
			list.push(
				<li onClick={() => this.setState({
					modalOpen: true,
					selectedName: "Scholarship " + index,
					selectedGpa: "3." + index,
					selectedFaculty: "Any",
					selectedDeadline:"yesterday"
				})}>
						<Scholarship name={"Scholarship " + index} gpa={"3." + index} faculty="Any" deadline="yesterday" />
					
					{/* link-to goes here */}
				</li>
			)
		}
		console.log(list);
		
		return list

	}

	render() {
    	return (
			<div>
				<h1 className = "Title">Scholarships</h1>
				<Modal isOpen={this.state.modalOpen} onRequestClose={() => this.setState({modalOpen: false})} >
					<h2>{this.state.selectedName}</h2>
					<p>Faculty: {this.state.selectedFaculty}</p>
					<p>Minimum Required GPA: {this.state.selectedGpa}, Apply By: {this.state.selectedDeadline}</p>
					<p>A description would usually go here. Also, for now, the apply button is a dummy, but cancel should work. You can also click outside of the popup to close it.</p>
					<div>
						<button onClick={() => this.setState({modalOpen: false})}>Cancel</button>
						<button>Apply</button>
					</div>
				</Modal>
				<ul>
					{this.createList()}
				</ul>
			</div>
		);
	}
}


export default Scholarships;
