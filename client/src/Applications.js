import React from 'react';
import './App.css';
import Scholarship from './Scholarship'
import Popup from './Popup';
import Scholarships from './Scholarships';

/*
	The list of scholarships that were applied for are displayed
*/
class Applications extends Scholarships {
	
	/*
	Goes through each scholarship that was applied for and sets up the information that will be displayed. The list is returned.
	*/
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
		
    	return (
			<div>
				<h1 className = "Title"> My Applications </h1>
				
				<ul> {
					this.createList()
				} </ul>
				
        		{/*
					When a scholarship is clicked on, an element pops up and shows the name, faculty, GPA requried, and description of the
					scholarship
				*/}
				<Popup
					isOpen={this.state.modalOpen}
					innerIsOpen={this.state.innerModalOpen}
					innerMessage={this.state.innerModalMessage}
					close={() => this.setState({modalOpen: false})}
					innerClose={() => this.setState({innerModalOpen : false})}
					scholarship={this.state.selectedScholarship}

					studentID={this.props.studentID}
					appliedFor={true}
					offered={false}
					accepted={false}
					
					update={() => this.props.updateApplied()}
					apply={this.apply}
				/>

			</div>
		);
	}
}

export default Applications;
