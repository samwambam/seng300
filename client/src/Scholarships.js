import React, { Component } from 'react';
import './App.css';
import Scholarship from './Scholarship';
import Modal from "react-modal";


class Scholarships extends Component {

	constructor(props) {
		super(props);

		this.state = {
			scholarships: [],
			// popup stuff:
			modalOpen: false,
			selectedScholarhsip: {},
			// seacth stuff:
			scholarshipsToDisplay:  [],
			selectedFaculty: "any",
			selectedProgram: "any",
			showAll: true,
		}
	}

	componentDidMount() {
		this.scholarshipList();
	}

	scholarshipList() {
		fetch('/api/scholarships')
			.then((res) => res.json())
			.then((response) => {
				this.setState({scholarships: response.response, scholarshipsToDisplay: response.response})
			})
	}

	capitalize = (stringInput) => {
		let str = stringInput.toString()
		console.log(str);
		
		return str.charAt(0).toUpperCase() + '' + str.slice(1)
	}

	getDisplayDate = (dateString) => {
		let date = new Date(dateString)
		return date.toUTCString().slice(0,11)
	}

	searchList = (event) => {
		let awards = this.state.scholarships;
		let awardsToDisplay = awards.filter((award) => {
			return award.scholarship_name.toString().toLowerCase().search(event.target.value.toString().toLowerCase()) !== -1;
		});

		this.setState({scholarshipsToDisplay: awardsToDisplay});
	}
	
	filterByFaculty = (event) => {
		let awards = this.state.scholarships;
		let value = event.target.value;
		this.setState({selectedFaculty: value});
		let awardsToDisplay = awards.filter((award) => {
			if (value === "any") {
				return 1
			} else {
				return award.offering_faculty.toString().toLowerCase() === value;
			}
		});
	
		this.setState({scholarshipsToDisplay: awardsToDisplay});
	}

	createList = () => {
		let list = []

		// Loop to create all the <li>-s

		this.state.scholarshipsToDisplay.forEach(item => {
			list.push(	
				<li onClick={() => {
					if (!item.awarded) {
						this.setState({
							modalOpen: true,
							selectedScholarhsip: item
						})
					}
				} }>
					<Scholarship
						name={item.scholarship_name}
						gpa={item.min_gpa}
						faculty={"Faculty: " + this.capitalize(item.offering_faculty)}
						deadline={this.getDisplayDate(item.deadline)}
						awarded={item.awarded}
					/>	
				</li>
			
			)
    
		});

		return list
	}
	
	render() {
    	return (
			<div>

				<h1 className = "Title">Scholarships</h1>

				<form>
					<input type="text" placeholder="Search..." onChange={this.searchList} />
					<div className="radioButtonsFaculty">
						{"Filter by Faculty: "}
						<label>
							<input 
								type="radio"
								name="facultyFilter"
								value="any"
								checked={this.state.selectedFaculty === "any"}
								onChange={this.filterByFaculty}
							/>
							{"Any "}
						</label>
						<label>
							<input 
								type="radio"
								name="facultyFilter"
								value="science"
								checked={this.state.selectedFaculty === "science"}
								onChange={this.filterByFaculty}
							/>
							{"Science "}
						</label>
						<label>
							<input 
								type="radio"
								name="facultyFilter"
								value="engineering"
								checked={this.state.selectedFaculty === "engineering"}
								onChange={this.filterByFaculty}
							/>
							{"Engineering "}
						</label>
					</div>

					{/*
						add radio buttons later: 2 sets, one for program other for faculty;
						also a show all/"for me" toggle to show all scholarships or only those that the students eligible for 
						TODO: make filter and search synchronized!!! Can't have one messing the other's work up!
						note to self: probably have an apply button or something to apply all filter criteria
						note to self 2: have the scholarship panels and pages display the program it's offered to (eg: undergrad, masters, etc.)
					*/}
				</form>

				{/* This is a popup "div" for more info on each scholarship */}
				<Modal isOpen={this.state.modalOpen} onRequestClose={() => this.setState({modalOpen: false})} >
					<h2>{this.state.selectedScholarhsip.scholarship_name}</h2>
					<p>Faculty: {this.state.selectedScholarhsip.offering_faculty}</p>
					<p>Minimum Required GPA: {this.state.selectedScholarhsip.min_gpa}, Apply By: {new Date(this.state.selectedScholarhsip.deadline).toUTCString()}</p>
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
