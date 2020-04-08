import React, { Component } from 'react';
import './Scholarships.css';
import Scholarship from './Scholarship';
import Modal from "react-modal";
import Select from "react-select";
import { facultyOptions, programOptions } from "./docs/Data";



class Scholarships extends Component {
	/*
	displays scholarships that we can search for and filter through
	*/

	constructor(props) {
		super(props);
    
		this.state = {
			scholarships: [],
			// popup stuff:
			modalOpen: false,
			selectedScholarship: {},
			// search stuff:
			searchQuery: '',	//the input typed in by the user
			scholarshipsToDisplay:  [],	//scholarships that the user wants to see
			selectedFaculties: ["any"],	//the faculties that the user wants scholarships from 
			selectedPrograms: ["any"],	//the programs that the user wants scholarships from
			personalize: false,
		}

		this.apply = this.apply.bind(this);
		this.unapply = this.unapply.bind(this);
	}

	/*get the list of scholarships from server after components are rendered*/
	componentDidMount() {	
		this.scholarshipList();
	}

	/*
	Applying for a scholarship
	*/
	apply() {
		// check:
		// 1. Can apply (correct program, faculty, GPA, etc)
		// 2. Has spots (has applied for less than 3 awards)
		// 3. Has not applied for this scholarship yet
		// 4. Scholarship has not been awarded yet
		
		let student = this.props.student;
		let selected = this.state.selectedScholarship;
		let list = this.props.appliedList;

		let check1 = (
					student.faculty === selected.offering_faculty &&
					student.status === selected.offering_status &&
					student.gpa >= selected.min_gpa &&
					!student.wd_on_transcript
		);

		let check2 = list.length < 3;

		let check3 = list.filter((item) => {
			return item.scholarship_id === selected.scholarship_id
		}).length === 0;
		
		let check4 = !selected.awarded;

		// console.log(check1, check2, check3, check4);
		

		if (check1 && check2 && check3 && check4) {
			fetch(`/api/scholarships/apply/${student.student_id}/${selected.scholarship_id}`, {
				method: 'post'
			})

		} else {
			console.log("Unable to apply. Check that you're eligible")
		}

		// TODO : have a popup or some form of a message for success/failure !!

		// after applied for, update the state in portal by fetching the list of scholatships applied for again
		console.log(this.state.selectedScholarship)
		this.props.updateApplied();
	}

	/*
	Unapplying for a scholarship that was applied for
	*/
	unapply() {
		console.log('work in progress...')
	}

	/*
	Obtains scholarships from the server side 
	*/
	scholarshipList() {
		fetch('/api/scholarships')	//returns the scholarships from database
			.then((res) => res.json())	//changes the scholarships information to json format
			.then((response) => {	
				this.setState({scholarships: response.response, scholarshipsToDisplay: response.response}) //puts the scholarship information in the two arrays
			})
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
				facultiesPicked = criteria ? criteria.map(((item) => item.value)) : ['any']; //returns the array of values(name) of the faculty options that were picked
				this.setState({ selectedFaculties: facultiesPicked });
				break;
			case 'programs': 
				programsPicked = criteria ? criteria.map(((item) => item.value)) : ['any']; //returns the array of values(name) of the program options that were picked
				this.setState({ selectedPrograms: programsPicked });
				break;
			case 'search': 
				searchQuery = criteria;	//the input entered in the search bar
				this.setState({ searchQuery: criteria })
				break;
			default:
				break;
		}
		
		let awards = this.state.scholarships;
		let awardsToDisplay = awards.filter((award) => { //returns an array of scholarships that were searched for, or picked by faculty or program
			let matchesSearch = award.scholarship_name.toString().toLowerCase().search(searchQuery.toString().toLowerCase()) !== -1; //check if all letters up to a certain position match
			let matchesFaculty = facultiesPicked[0] === "any" ? true : facultiesPicked.includes(award.offering_faculty.toString().toLowerCase()); //if the scholarship's faculty matches the faculty that the user wants 
			let matchesProgram = programsPicked[0] === 'any' ? true : programsPicked.includes(award.offering_status.toString().toLowerCase());	//if the scholarship's program matches the program that the user wants 
			return matchesSearch && matchesFaculty && matchesProgram;
		});

		this.setState({scholarshipsToDisplay: awardsToDisplay});
		console.log(awardsToDisplay);
		
	}

	/*
	Goes through the list of scholarships that are to be shown and returns the list of scholarships formatted by Scholarship.js 
	*/
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
							onChange={(value) => this.applyFilter('faculties', value) /*gives applyFilter the faculty option that was clicked on*/} 
							styles={colourStyles}
						/>
					</div>

					<div className="select">
						<Select
							isMulti
							isSearchable={true}
							options={programOptions}
							placeholder="Filter By Program..."
							onChange={(value) => this.applyFilter('programs', value) /*gives applyFilter the program option that was clicked on*/} 
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
						<button onClick={this.apply} > Apply </button>
					</div>
				</Modal>

				<ul>
					{this.createList() //This is where all of the scholarships are displayed
					}
				</ul>

			</div>
		);
	}
}


export default Scholarships;
