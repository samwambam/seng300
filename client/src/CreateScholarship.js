import React, { Component } from 'react';
import './CreateScholarship.css';


class CreateScholarship extends Component {
    constructor(props) {
		super(props);
    
		this.state = {
            scholarshipName: '',
            scholarshipId: 0,
            deadline: '',
            faculty: '',
            status: '',
            minGpa: 0.0,
            description: ''
        };

        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const name = target.name;
        const value = target.value;
        
        this.setState({
            [name]: value
        });
    }

	render() {
    	return (
			<div>
				<h1 className = "Title">Add New Scholarship</h1>
                <form>
                    <div class="form-element">
                        <label>Name</label>
                        <input 
                            name = "scholarshipName"
                            type = "text"
                            value = {this.state.scholarshipName} 
                            onChange={this.handleInputChange}/>
                    </div>

                    <div class="form-element">
                        <label>ID</label>
                        <input name="scholarshipId" type="number"/>
                    </div>

                    <div class="form-element">
                        <label>Deadline</label>
                        <input name="deadline" type="date"/>
                    </div>
                    <div class="form-element">
                        <label>Faculty</label>
                        <select name='faculty'>
                            <option value="science">Science</option>
                            <option value="engineering">Engineering</option>
                            <option value="arts">Arts</option>
                            <option value="business">Business</option>
                            <option value="nursing">Nursing</option>
                        </select>
                    </div>
                    <div class="form-element">
                        <label>Status</label>
                        <select name='status'>
                            <option value="undergraduate">Undergraduate</option>
                            <option value="graduate">Graduate</option>
                            <option value="masters">Masters</option>
                            <option value="doctoral">Doctoral</option>
                        </select>
                    </div>
                    <div class="form-element">
                        <label>Minimum GPA</label>
                        <input name = 'minGpa' type="number" placeholder="3.5" step="0.01" min="0" max="4.0"/>
                    </div>
                    <div class="form-element">
                        <label>Description</label>
                        <textarea name="description"></textarea>
                    </div>
                    <input type="submit" value="Submit" />
                </form>
			</div>
		);
	}
}

export default CreateScholarship;