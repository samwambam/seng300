import React, { Component } from 'react';
import Modal from "react-modal";


const innerStyles = {
    content : {
        top                   : '50%',
        left                  : '50%',
        right                 : 'auto',
        bottom                : 'auto',
        marginRight           : '-50%',
        transform             : 'translate(-50%, -50%)'
	}
};


class Popup extends Component {

    state = {
        applicantNum: 0,
        avgGPA: 0,
    }

    componentWillReceiveProps() {
        let scholarship = this.props.scholarship;

        // grab some stats about the scholarship
        fetch(`/api/getCountAndAvgGpa/${scholarship.scholarship_id ? scholarship.scholarship_id : 123456}`)
            .then((res) => res = res.json())
            .then(data => {
                console.log(data.response, "data");
                
                if (data.response != null && data.response.length) {
                    console.log("setting!");
                    
                    this.setState({
                        applicantNum: data.response[0].num_applied,
                        avgGPA: data.response[0].avg_gpa,
                    })
                } else {
                    this.setState({
                        applicantNum: 0,
                        avgGPA: 0,
                    })
                }
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

    delete() {
        fetch('/api/deleteScholarship/' + this.props.scholarship.scholarship_id, {
            method: 'delete'
        })
        .then(res => {
            console.log(res)
        })
    }
    
	render() {

        let scholarship = this.props.scholarship;

    	return (

            <Modal isOpen={this.props.isOpen} onRequestClose={this.props.close} >
                {/* Display scholarship information */}

                <h2>{scholarship.scholarship_name} {scholarship.awarded ? " : Awarded" : ""}</h2>
                <p className = "Faculty">Faculty: {scholarship.offering_faculty}</p>
                <p>Minimum Required GPA: {scholarship.min_gpa}</p>
                <p>Apply By: {new Date(scholarship.deadline).toUTCString()}</p>
                <p>{scholarship.scholarship_description}</p>
                <p> Number of applicants: {this.state.applicantNum} (Average GPA: {this.state.avgGPA})</p>

                <div>
                    <button onClick={this.props.close}>Cancel</button>
					<button className = "delete-btn" onClick={this.delete.bind(this)}>Delete</button>
                </div>




                <Modal isOpen={this.props.innerIsOpen} style={innerStyles}>
                    <p>{this.props.innerMessage}</p>
                    <button onClick={this.props.innerClose}> OK </button>
                </Modal>

            </Modal>
		);
	}
}


export default Popup;
