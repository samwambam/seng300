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
			selectedScholarship: {},
			// seacth stuff:
			searchQuery: '',
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
		return str.charAt(0).toUpperCase() + '' + str.slice(1)
	}

	getDisplayDate = (dateString) => {
		let date = new Date(dateString)
		return date.toUTCString().slice(0,11)
	}

	
	applyFilter = (event) => {
		let value = event.target.value;
		
		let searchQuery = this.state.searchQuery;
		let facultyPicked = this.state.selectedFaculty;
		// let programPicked = this.selectedProgram;
		
		if (event.target.type === "radio") {
			this.setState({selectedFaculty: value});
			facultyPicked = value;
		} else if (event.target.type === "text"){
			this.setState({searchQuery: value});
			searchQuery = value;
		} else {
			console.log("Something's wrong");
		}
		
		
		let awards = this.state.scholarships;
		let awardsToDisplay = awards.filter((award) => {
			let matchesSearch = award.scholarship_name.toString().toLowerCase().search(searchQuery.toString().toLowerCase()) !== -1;
			let matchesFilter = facultyPicked === 'any' ? 1 : award.offering_faculty.toString().toLowerCase() === facultyPicked;
			return matchesSearch && matchesFilter;
		});
		this.setState({scholarshipsToDisplay: awardsToDisplay});
		console.log(awardsToDisplay);
		
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
							selectedScholarship: item
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
					
					<input type="text" placeholder="Search..." onChange={this.applyFilter} />

					<div className="radioButtonsFaculty">
						{"Filter by Faculty: "}
						<label>
							<input 
								type="radio"
								name="facultyFilter"
								value="any"
								checked={this.state.selectedFaculty === "any"}
								onChange={this.applyFilter}
							/>
							{"Any "}
						</label>
						<label>
							<input 
								type="radio"
								name="facultyFilter"
								value="science"
								checked={this.state.selectedFaculty === "science"}
								onChange={this.applyFilter}
							/>
							{"Science "}
						</label>
						<label>
							<input 
								type="radio"
								name="facultyFilter"
								value="engineering"
								checked={this.state.selectedFaculty === "engineering"}
								onChange={this.applyFilter}
							/>
							{"Engineering "}
						</label>
					</div>

					{/*
						NEW NOTE TO SELF: INSTEAD ADD A DROPDOWN MENU
							add radio buttons later: 2 sets, one for program other for faculty;
						also a show all/"for me" toggle to show all scholarships or only those that the students eligible for 
						note to self 2: have the scholarship panels and pages display the program it's offered to (eg: undergrad, masters, etc.)
					*/}
				</form>


				{/* This is a popup "div" for more info on each scholarship */}
				<Modal isOpen={this.state.modalOpen} onRequestClose={() => this.setState({modalOpen: false})} >
					<h2>{this.state.selectedScholarship.scholarship_name}</h2>
					<p>Faculty: {this.state.selectedScholarship.offering_faculty}</p>
					<p>Minimum Required GPA: {this.state.selectedScholarship.min_gpa}, Apply By: {new Date(this.state.selectedScholarship.deadline).toUTCString()}</p>
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
