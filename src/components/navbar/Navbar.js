import React, { Component } from "react";
import "./Navbar.css";

import _ from "lodash/fp";
import AddForm from "../add_form/AddForm.js";

let searchByHlpr = "";

class Navbar extends Component {
	constructor(){
		super();
		this.state = {
			searchBy: "...",
			showAddForm: false,
			chooseInput: 0
		}
	}

	toggleAddForm = () => {
		this.setState({
			showAddForm: !this.state.showAddForm
		});
	};

	toggleInput = () => {
		this.setState({
			chooseInput: !this.state.chooseInput
		});
	};

	changeSearching = item => {
		this.props.filterPeople(this.props.people);
		searchByHlpr = item;
		if(searchByHlpr === "gender"){
			this.setState({
				chooseInput: 1
			});
		} else {
			this.setState({
				chooseInput: -1
			});
		}
		this.setState({
			searchBy: item
		});
	};

	filterUsers = e =>{
		const text = e.currentTarget.value;
		if(searchByHlpr === "name"){
			const filteredUsers = this.getFilteredUsersByName(text);
			this.props.filterPeople(filteredUsers);
		} else if(searchByHlpr === "surname"){
			const filteredUsers = this.getFilteredUsersBySurname(text);
			this.props.filterPeople(filteredUsers);
		} else if(searchByHlpr === "address"){
			const filteredUsers = this.getFilteredUsersByAddress(text);
			this.props.filterPeople(filteredUsers);
		} else if(searchByHlpr === "gender"){
			const filteredUsers = this.getFilteredUsersByGender(text);
			this.props.filterPeople(filteredUsers);
		}
	};

	getFilteredUsersByName = text => {
		return this.props.people.filter(person => person.name.toLowerCase().includes(text.toLowerCase()));
	};
	getFilteredUsersBySurname = text => {
		return this.props.people.filter(person => person.surname.toLowerCase().includes(text.toLowerCase()));
	};
	getFilteredUsersByAddress = text => {
		return this.props.people.filter(person => person.address.toLowerCase().includes(text.toLowerCase()));
	};
	getFilteredUsersByGender = text => {
		if(text === "-"){
			return this.props.people;
		} else {
			return this.props.people.filter(person => person.gender.toLowerCase() === text.toLowerCase());
		}
	};

	render(){
		const items = this.props.items;
		const listItems = _.map(item => (
			<li key={item} onClick={() => this.changeSearching(item)}>
		 		{item}
			</li>
			), items
		);

		return(
			<div className="Navbar">
				<div 
					className="Nav-button Add-person-button" 
					onClick={this.toggleAddForm.bind(this)}
				>
					Add person
				</div>
				<div className="Nav-button Search-by-button">
					<span>{"Search by " + this.state.searchBy}</span>
					<div className="Nav-dropdown">
						<ul className="Nav-list">
 							{listItems}
 						</ul>
 					</div>
				</div>

				{this.state.chooseInput !== 0 ?
					(this.state.chooseInput === -1 ?
						<input placeholder={"Type " + this.state.searchBy} onInput={this.filterUsers.bind(this)} /> 
						: 
						<select onChange={this.filterUsers.bind(this)}>
							<option value="-">-</option>
  							<option value="male">Male</option>
  							<option value="female">Female</option>
						</select>)
					:
					null					
				}

				{this.state.showAddForm ? 
					<AddForm 
						toEdit={false}
						closeAddForm={this.toggleAddForm.bind(this)} 
						people={this.props.people} 
						addPeople={this.props.addPeople}
					/> 
					:
					null
				}

				{this.props.people.length !== 0 ? 
					<div 
						className="Nav-button Delete-all-button"
						onClick={this.props.deleteAll}
					>
						Delete all
					</div>
					:
					null
				}
			</div>
		);
	}
}

export default Navbar;