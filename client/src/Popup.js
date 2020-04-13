import React, { Component } from 'react';
import './Scholarships.css';
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

        this.unapply = this.unapply.bind(this);
        this.accept = this.accept.bind(this);
        this.reject = this.reject.bind(this);
    }
    
    capitalize = (stringInput) => {
        let str = stringInput.toString()		
		return str.charAt(0).toUpperCase() + '' + str.slice(1)
	}
    
	getDisplayDate = (dateString) => {
        let date = new Date(dateString)
		return date.toUTCString().slice(0,11)
    }
    
    unapply() {
        fetch(`/api/scholarships/unapply/${this.props.studentID}/${this.props.scholarship.scholarship_id}`, {
            method: 'post',
        })
            .then((res) => {
                console.log(res);
                this.props.update();
                this.props.close();
            })
    }
    
    accept() {
        // api is untested currently
        fetch(`api/accept/${this.props.studentID}/${this.props.scholarship.scholarship_id}`, {
            method: 'put',
        })
            .then((res) => {
                console.log(res);
                this.props.update();
                // we should print a message here (set the state of SCHOLARSHIPS innerMessage)
            })
    }

    reject() {
        // api is untested currently
        fetch(`api/reject/${this.props.studentID}/${this.props.scholarship.scholarship_id}`, {
            method: 'post',
        })
            .then((res) => {
                console.log(res);
                this.props.update();
                // we should print a message here (set the state of SCHOLARSHIPS innerMessage)
            })
    }

	render() {

        let scholarship = this.props.scholarship;

    	return (

            <Modal isOpen={this.props.isOpen} onRequestClose={this.props.close} >
                {/* Display scholarship information */}

                <h2>{scholarship.scholarship_name}</h2>
                <p>Faculty: {scholarship.offering_faculty}</p>
                <p>Minimum Required GPA: {scholarship.min_gpa}, Apply By: {new Date(scholarship.deadline).toUTCString()}</p>
                <p>{scholarship.scholarship_description}</p>
                <div>
                    <button onClick={this.props.close}>Cancel</button>
                    {
                        !this.props.appliedFor && 
                            <button onClick={this.props.apply} > Apply </button>
                    }
                    {
                        this.props.appliedFor && !this.props.offered &&
                            <button onClick={this.unapply} > Unapply </button>
                    }
                    {
                        this.props.offered && !this.props.accepted &&
                        <div>
                            <button onClick={this.accept} > Accept </button>
                            <button onClick={this.reject} > Reject </button>
                        </div>
                    }
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
