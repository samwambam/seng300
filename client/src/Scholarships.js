import React, { Component } from 'react';
import './App.css';
import Scholarship from './Scholarship';
import Modal from "react-modal";


class Scholarships extends Component {

	constructor(props) {
		super(props);
		this.state = {
			modalOpen: false,
			selectedScholarhsip: {},
			scholarships: []
		}
	}
	// TODO add a dummy selectedScholarship to initialize with

	componentDidMount() {
		this.scholarshipList();
	}

	scholarshipList() {
		fetch('/api/scholarships')
			.then((res) => res.json())
			.then((response) => {
				this.setState({scholarships: response.response})
			})
	}

	createList = () => {
		let list = []

		// Loop to create all the <li>-s
			this.state.scholarships.forEach(item => {
			list.push(
					<li onClick={() => this.setState({
					modalOpen: true,
					selectedScholarhsip: item
				})}>
						<Scholarship name={item.scholarship_name} gpa={item.min_gpa} faculty={item.offering_faculty} deadline={item.deadline} />	
				</li>
			)
			});
		return list
	}

	render() {
		// console.log(this.state);

    	return (
			<div>

				<h1 className = "Title">Scholarships</h1>

				{/* This is a popup "div" for more info on each scholarship */}
				<Modal isOpen={this.state.modalOpen} onRequestClose={() => this.setState({modalOpen: false})} >
					<h2>{this.state.selectedScholarhsip.scholarship_name}</h2>
					<p>Faculty: {this.state.selectedScholarhsip.offering_faculty}</p>
					<p>Minimum Required GPA: {"?"}, Apply By: {"?"}</p>
					<p>A description would usually go here. Also, for now, the apply button is a dummy, but cancel should work. You can also click outside of the popup to close it.</p>
					<div>
						<button onClick={() => this.setState({modalOpen: false})}>Cancel</button>
						<button>Apply</button>
					</div>
				</Modal>

				{/* This is where all of the scholarships are displayed */}
				<ul>
					{this.createList()}
				</ul>

</div>
		);
	}
}


export default Scholarships;
