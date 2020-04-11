import React, { Component } from 'react';
import './Scholarships.css';
import Scholarship from './Scholarship';
import Select from "react-select";
import { facultyOptions, programOptions } from "./docs/Data";
import Popup from "./Popup";


class Scholarships extends Component {

	constructor(props) {
		super(props);
    
		this.state = {
			scholarships: [],
			// popup stuff:
			modalOpen: false,
			selectedScholarship: {},
			innerModalOpen: false,
			innerModalMessage: "You should't be here...",
			// seacth stuff:
			searchQuery: '',
			scholarshipsToDisplay:  [],
			selectedFaculties: ["any"],
			selectedPrograms: ["any"],
			personalize: false,
		}

		this.apply = this.apply.bind(this);
	}

	componentDidMount() {	/*get the list of scholarships from server after components are rendered*/
		this.scholarshipList();
	}

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
			// apply for a scholarship

			fetch(`/api/scholarships/apply/${student.student_id}/${selected.scholarship_id}`, {
				method: 'post'
			})

			// set a success message
			this.setState({innerModalMessage: "Successfully applied!"})
		} else {
			// console.log("Unable to apply. Check that you're eligible")
			this.setState({innerModalMessage: "Couldn't apply, make sure you're eligible."})
		}

		// Display the popup message
		this.setState({innerModalOpen: true})

		// after applied for, update the state in portal by fetching the list of scholatships applied for again
		console.log(this.state.selectedScholarship)
		this.props.updateApplied();
	}




	scholarshipList() {
		fetch('/api/scholarships')	/*returns the scholarships in database*/
			.then((res) => res.json())	/*changes the scholarships information to json format*/
			.then((response) => {	
				this.setState({scholarships: response.response, scholarshipsToDisplay: response.response}) /*puts all the scholarship information in the two arrays*/
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
				facultiesPicked = criteria ? criteria.map(((item) => item.value)) : ['any']; /*returns the array of values(name) of the faculty options that were picked*/
				this.setState({ selectedFaculties: facultiesPicked });
				break;
			case 'programs': 
				programsPicked = criteria ? criteria.map(((item) => item.value)) : ['any']; /*returns the array of values(name) of the program options that were picked*/
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
		let awardsToDisplay = awards.filter((award) => { /*returns an array of scholarships that were searched for, or picked by faculty or program*/
			let matchesSearch = award.scholarship_name.toString().toLowerCase().search(searchQuery.toString().toLowerCase()) !== -1; /*check if all letters up to a certain position match*/
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

				{/* This is a popup "div" for more info on each scholarship */}
				<Popup
					isOpen={this.state.modalOpen}
					innerIsOpen={this.state.innerModalOpen}
					innerMessage={this.state.innerModalMessage}
					close={() => this.setState({modalOpen: false})}
					innerClose={() => this.setState({innerModalOpen : false})}
					scholarship={this.state.selectedScholarship}
					appliedFor={this.props.appliedList.filter((item) => { return item.scholarship_id === this.state.selectedScholarship.scholarship_id }).length }
					offered={false}
					accepted={false}
					apply={this.apply}
					accept={() => console.log("accepted!")}
					reject={() => console.log("rejected!")}
				/>


				{/* This is where all of the scholarships are displayed */}
				<ul>
					{this.createList()}
				</ul>

			</div>
		);
	}
}


export default Scholarships;
