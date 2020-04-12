import React, { Component } from 'react';
import './CreateScholarship.css';

class CreateScholarship extends Component {
    constructor(props) {
		super(props);
    
        // default values populated for testing. set blank once works
		this.state = {
            scholarshipName: 'Test',
            scholarshipId: 222222,
            deadline: '2020-04-20',
            faculty: 'science',
            status: 'graduate',
            minGpa: 3.5,
            description: 'This is a test'
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    // function to set state variables when they are updated in the form
    handleInputChange(event) {
        const target = event.target;
        const name = target.name;
        const value = target.value;
        
        this.setState({
            [name]: value
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        
        let formData = new URLSearchParams({
            'scholarshipName' : `${this.state.scholarshipName}`,
            'scholarshipId' : `${this.state.scholarshipId}`,
            'deadline' : `${this.state.deadline}`,
            'faculty' : `${this.state.faculty}`,
            'status' : `${this.state.status}`,
            'mingpa': `${this.state.minGpa}`,
            'description': `${this.state.description}`
        });

        fetch('/api/scholarhips/add', {
            method: 'PUT',
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: formData
        })
        .then(response => {
            console.log('hi');
            return response.json();
        })
        .then((data) => {
            console.log(data);
        });
    }

	render() {
    	return (
			<div>
				<h1 className = "Title">Add New Scholarship</h1>
                <form onSubmit={this.handleSubmit}>

                    <div className="form-element">
                        <label>Name</label>
                        <input 
                            name = "scholarshipName"
                            type = "text"
                            maxLength = "45"
                            value = {this.state.scholarshipName} 
                            onChange={this.handleInputChange}/>
                    </div>

                    <div className="form-element">
                        <label>ID</label>
                        <input 
                            name = "scholarshipId"
                            type = "number"
                            min = "100000"
                            max = "999999"
                            value = {this.state.scholarshipId}
                            onChange = {this.handleInputChange}/>
                    </div>

                    <div className="form-element">
                        <label>Deadline</label>
                        <input 
                            name="deadline"
                            type="date"
                            value = {this.state.deadline}
                            onChange = {this.handleInputChange}/>
                    </div>

                    <div className="form-element">
                        <label>Faculty</label>
                        <select name='faculty'value={this.state.faculty} onChange={this.handleInputChange}>
                            <option value="science">Science</option>
                            <option value="engineering">Engineering</option>
                            <option value="arts">Arts</option>
                            <option value="business">Business</option>
                            <option value="nursing">Nursing</option>
                        </select>
                    </div>

                    <div className="form-element">
                        <label>Status</label>
                        <select name='faculty'value={this.state.status} onChange={this.handleInputChange}>
                            <option value="undergraduate">Undergraduate</option>
                            <option value="graduate">Graduate</option>
                            <option value="masters">Masters</option>
                            <option value="doctoral">Doctoral</option>
                        </select>
                    </div>

                    <div className="form-element">
                        <label>Minimum GPA</label>
                        <input 
                            name = 'minGpa'
                            type="number"
                            value = {this.state.minGpa}
                            onChange = {this.handleInputChange}
                            step="0.01"
                            min="0.0"
                            max="4.0"/>
                    </div>

                    <div className="form-element">
                        <label>Description</label>
                        <textarea 
                            name="description"
                            value={this.state.description}
                            onChange={this.handleInputChange}/>
                    </div>

                    <input type="submit" value="Submit"/>
                </form>
			</div>
		);
	}
}

export default CreateScholarship;