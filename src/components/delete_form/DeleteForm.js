import React, { Component } from "react";
import "./DeleteForm.css";

function onYesButton(props){
	props.deleteOne(props.deleteId);
	props.toggleDelete();
}

class DeleteForm extends Component {
	render(){
		return (
			<div className="Delete-cover">
				<div className="Delete-wrapper">
					<div className="Delete-notification">
						Do you wish to delete this record?
					</div>
					<div className="Delete-buttons">
						<button type="button" className="Delete-button" onClick={() => onYesButton(this.props)}>Yes</button>
						<button type="button"className="Delete-button" onClick={() => this.props.toggleDelete()}>No</button>
					</div>
				</div>
			</div>
		);
	}
}

export default DeleteForm;