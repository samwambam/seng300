import React, { Component } from 'react';
import './App.css';
import Scholarship from './Scholarship'
import Popup from './Popup';


class Applications extends Component {
	constructor(props){
		super(props);
		this.state = {
			scholarships: [],
			selectedScholarship: {},
			scholarshipsToDisplay:  [],
			modalOpen: false,
			innerModalOpen: false,
			innerModalMessage: "You should't be here...",
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
	
	
	createList = () => {
		let list = []

		// Loop to create all the <li>-s

		// now fetches the scholarships applied for in portal and passes to Application as a prop `this.props.list`

		this.props.list.forEach(item => {
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

		// let id = this.props.id;

		// console.log(id);
		
		
    	return (
			<div>
				<h1 className = "Title"> My Applications </h1>
				<ul>
				{this.createList()}
				</ul>
				
				<Popup
					isOpen={this.state.modalOpen}
					innerIsOpen={this.state.innerModalOpen}
					innerMessage={this.state.innerModalMessage}
					close={() => this.setState({modalOpen: false})}
					innerClose={() => this.setState({innerModalOpen : false})}
					scholarship={this.state.selectedScholarship}
					appliedFor={true}
					offered={false}
					accepted={false}
					apply={this.apply}
					accept={() => console.log("accepted!")}
					reject={() => console.log("rejected!")}
				/>

			</div>
		);
	}
}

export default Applications;
