import React, { Component } from 'react';
import './CreateScholarship.css';


class CreateScholarship extends Component {

	render() {
    	return (
			<div>
				<h1 className = "Title">Add New Scholarship</h1>
                <form>
                    <div class="form-element">
                        <label>Name</label>
                        <input name="scholarshipName" type="text"/>
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
                        <input name = 'mingpa' type="number" placeholder="3.5" step="0.01" min="0" max="4.0"/>
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