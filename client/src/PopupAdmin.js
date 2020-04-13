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
    constructor(props) {
        super(props);


    }
    
    capitalize = (stringInput) => {
        let str = stringInput.toString()		
		return str.charAt(0).toUpperCase() + '' + str.slice(1)
	}
    
	getDisplayDate = (dateString) => {
        let date = new Date(dateString)
		return date.toUTCString().slice(0,11)
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
                <p> Number of applicants: {"number"}</p>

                <div>
                    <button onClick={this.props.close}>Cancel</button>
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
