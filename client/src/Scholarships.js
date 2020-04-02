import React, { Component } from 'react';
import './Scholarships.css';
import Scholarship from './Scholarship';
import Modal from "react-modal";
import Select from "react-select";
import { facultyOptions, programOptions } from "./docs/Data";


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
			selectedFaculties: ["any"],
			selectedPrograms: ["any"],
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

	/*
	This is the function that handles all the LOCAL search queries and filters
	It works in real time, i.e. there is no need to submit the filter request,
	just picking the faculty/program and/or typing in the searchbar automatically
	updates the list.	
	*/

	applyFilter = (type, criteria) => {

		let searchQuery = this.state.searchQuery;
		let facultiesPicked = this.state.selectedFaculties;
		let programsPicked = this.state.selectedPrograms;

		switch (type) {
			case 'faculties':
				facultiesPicked = criteria ? criteria.map(((item) => item.value)) : ['any'];
				this.setState({ selectedFaculties: facultiesPicked });
				break;
			case 'programs':
				programsPicked = criteria ? criteria.map(((item) => item.value)) : ['any'];
				this.setState({ selectedPrograms: programsPicked });
				break;
			case 'search':
				searchQuery = criteria;
				this.setState({ searchQuery: criteria })
				break;
			default:
				break;
		}
		
		let awards = this.state.scholarships;
		let awardsToDisplay = awards.filter((award) => {
			let matchesSearch = award.scholarship_name.toString().toLowerCase().search(searchQuery.toString().toLowerCase()) !== -1;
			let matchesFaculty = facultiesPicked[0] === "any" ? true : facultiesPicked.includes(award.offering_faculty.toString().toLowerCase());
			let matchesProgram = programsPicked[0] === 'any' ? true : programsPicked.includes(award.offering_status.toString().toLowerCase());
			return matchesSearch && matchesFaculty && matchesProgram;
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

		const colourStyles = {

			option: (styles, { isFocused }) => {
			  return {
				...styles,
				backgroundColor: isFocused ? '#f28785' : null,
				};
			},

		};

    	return (
			<div>

				<h1 className = "Title">Scholarships</h1>
				
				<div className="filter">

					<input type="text" placeholder="Search..." onChange={(event) => this.applyFilter('search', event.target.value)} />

					<div className="select">
						<Select
							isMulti
							isSearchable={true}
							options={facultyOptions}
							placeholder="Filter By Faculty..."
							onChange={(value) => this.applyFilter('faculties', value)}
							styles={colourStyles}
						/>
					</div>

					<div className="select">
						<Select
							isMulti
							isSearchable={true}
							options={programOptions}
							placeholder="Filter By Program..."
							onChange={(value) => this.applyFilter('programs', value)}
							styles={colourStyles}
						/>
					</div>
				</div>


					{/*
						also a show all/"for me" toggle to show all scholarships or only those that the students eligible for 
						note to self 2: have the scholarship panels and pages display the program it's offered to (eg: undergrad, masters, etc.)
					*/}


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
