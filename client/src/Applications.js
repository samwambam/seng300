import React, { Component } from 'react';
import './App.css';
import Scholarship from './Scholarship'
import Modal from 'react-modal'


class Applications extends Component {
	constructor(props){
		super(props);
		this.state = {
			scholarships: [],
			selectedScholarship: {},
			scholarshipsToDisplay:  [],
			modalOpen: false,
		}
	}
	
	capitalize = (stringInput) => {
		let str = stringInput.toString()		
		return str.charAt(0).toUpperCase() + '' + str.slice(1)
	}

	getDisplayDate = (dateString) => {
		let date = new Date(dateString)
		return date.toUTCString().slice(0,11)
	}
	
	componentDidMount() {
		this.appliedList();
	}
	
	appliedList() {
		let id = this.props.id;
		fetch('/api/scholarships/applied/' + id)
			.then((res) => res.json())
			.then((response) => {
				this.setState({scholarships: response.response, scholarshipsToDisplay: response.response})
			})
			console.log(this.state);
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
		return list;
	}
	render() {

		let id = this.props.id;

		console.log(id);
		
		
    	return (
			<div>
				<div className = "Title">My Applications</div>
				<ul>
				{this.createList()}
				</ul>
				
				<Modal isOpen={this.state.modalOpen} onRequestClose={() => this.setState({modalOpen: false})} >
					<h2>{this.state.selectedScholarship.scholarship_name}</h2>
					<p>Faculty: {this.state.selectedScholarship.offering_faculty}</p>
					<p>Minimum Required GPA: {this.state.selectedScholarship.min_gpa}, Apply By: {new Date(this.state.selectedScholarship.deadline).toUTCString()}</p>
					<p>A description would usually go here. Also, for now, the apply button is a dummy, but cancel should work. You can also click outside of the popup to close it.</p>
					<div>
						<button onClick={() => this.setState({modalOpen: false})}>close</button>
	
					</div>
				</Modal>
			</div>
		);
	}
}

export default Applications;
