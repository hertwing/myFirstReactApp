import React from "react";
import "./ListBox.css";

import _ from "lodash/fp";

function capitalize(str){
	return str.charAt(0).toUpperCase() + str.slice(1);
}

function onEditButton(props, person){
	props.toggleEdit();
	props.setPersonId(person);
}

function onDeleteButton(props, person){
	props.toggleDelete();
	props.setPersonId(person);
}

const ListBox = props => {
	const people = props.peopleToShow;
	const peopleList = _.map(
    	person => (
      		<tr key={person.id}>
        		<td className="Td-id">{person.id}</td>
        		<td className="Td-name">{capitalize(person.name)}</td>
        		<td className="Td-surname">{capitalize(person.surname)}</td>
    	    	<td className="Td-address">{capitalize(person.address)}</td>
	       		<td className="Td-gender">{capitalize(person.gender)}</td>
	       		<td className="Td-buttons">
	       			<div className="Td-buttons-wrapper">
	       				<button type="button" className="List-button" onClick={() => onEditButton(props, person)}>&#9998;</button>
	       				<button type="button" className="List-button" onClick={() => onDeleteButton(props, person)}>&#10006;</button>
	       			</div>
	       		</td>
      		</tr>
    	),
    	people
 	);

	return (
		<div className="List-box">
			<table>
				<thead>
					<tr>
						<th className="Th-id">ID</th>
						<th className="Th-name">Name</th>
						<th className="Th-surname">Surname</th>
						<th className="Th-address">Address</th>
						<th className="Th-gender">Gender</th>
						<th className="Th-buttons">Edit/Del</th>
					</tr>
				</thead>
				<tbody>
					{peopleList}
				</tbody>
			</table>
		</div>
	);
};

export default ListBox;