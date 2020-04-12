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
    
    
    
    capitalize = (stringInput) => {
        let str = stringInput.toString()		
		return str.charAt(0).toUpperCase() + '' + str.slice(1)
	}
    
	getDisplayDate = (dateString) => {
        let date = new Date(dateString)
		return date.toUTCString().slice(0,11)
    }
    
    // TODO IMPLEMENT UNAPPLY HERE NOT IN SCHOLARSHIP.JS
    
    unapply() {
		console.log('work in progress...')
	}

	render() {

        let scholarship = this.props.scholarship;

    	return (

            <Modal isOpen={this.props.isOpen} onRequestClose={this.props.close} >
                {/* Display scholarship information */}

                <h2>{this.props.scholarship.scholarship_name}</h2>
                <p>Faculty: {this.props.scholarship.offering_faculty}</p>
                <p>Minimum Required GPA: {this.props.scholarship.min_gpa}, Apply By: {new Date(this.props.scholarship.deadline).toUTCString()}</p>
                <p>{this.props.scholarship.scholarship_description}</p>
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
                            <button onClick={this.props.accepted} > Accept </button>
                            <button onClick={this.props.reject} > Reject </button>
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
