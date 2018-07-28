import React, { Component } from "react";
import "./AppContent.css";

import ListBox from "../list_box/ListBox.js";
import Navbar from "../navbar/Navbar.js";
import AddForm from "../add_form/AddForm.js";
import DeleteForm from "../delete_form/DeleteForm.js";

const chooseItemArray = ["name", "surname", "address", "gender"];

class AppContent extends Component {
	state = {
    	people: [],
    	peopleToShow: [],
    	editPop: false,
    	deletePop: false,
    	personId: null
  	};

  	componentDidMount() {
    	const people = JSON.parse(localStorage.getItem("dataBase")) || [];
    	this.setState({
      		people,
      		peopleToShow: people
    	});
  	};

  	componentDidUpdate() {
     	localStorage.setItem("dataBase", JSON.stringify(this.state.people));
	}

	addPeople = (Person) => {
		this.state.people.push(Person);
		this.setState(state => ({
      		people: state.people,
      		peopleToShow: state.people
    	}));
	};

	filterPeople = (text) => {
		this.setState(state => ({
			peopleToShow: text,
		}));
	};

	setPersonId = Person => {
		this.setState(state => ({
		 	personId: Person
		}));
	};

	toggleEdit = () => {
		this.setState(state => ({
			editPop: !state.editPop
		}));
	};

	editPerson = (Person, editData) => {
		let tmpArrayP = [...this.state.people];
		let tmpArrayPTS = [...this.state.peopleToShow];
		tmpArrayP[tmpArrayP.indexOf(Person)] = editData;
		tmpArrayPTS[tmpArrayPTS.indexOf(Person)] = editData;
		this.setState({
       		people: tmpArrayP,
       		peopleToShow: tmpArrayPTS,
     	});
	}

	toggleDelete = () => {
		this.setState(state => ({
			deletePop: !state.deletePop
		}));
	};

	deleteOne = Person => {
	 	let tmpArrayP = [...this.state.people];
	 	let tmpArrayPTS = [...this.state.peopleToShow];
	 	tmpArrayP.splice(tmpArrayP.indexOf(Person), 1);
	 	tmpArrayPTS.splice(tmpArrayPTS.indexOf(Person), 1);
	 	this.setState({
       		people: tmpArrayP,
       		peopleToShow: tmpArrayPTS,
     	});
	};

	deleteAll = () => {
		this.setState({
      		people: [],
      		peopleToShow: []
    	});
	};

	render(){
		return (
			<div className="App-content">
				<ListBox 
					peopleToShow={this.state.peopleToShow}
					toggleEdit={this.toggleEdit}
					toggleDelete={this.toggleDelete}
					setPersonId={this.setPersonId}
				/>
				<Navbar 
					items={chooseItemArray} 
					people={this.state.people} 
					addPeople={this.addPeople} 
					deleteAll={this.deleteAll} 
					filterPeople={this.filterPeople}
				/>
				{this.state.editPop ? <AddForm closeAddForm={this.toggleEdit} toEdit={true} editId={this.state.personId} editPerson={this.editPerson} /> : null }
				{this.state.deletePop ? <DeleteForm toggleDelete={this.toggleDelete} deleteId={this.state.personId} deleteOne={this.deleteOne} /> : null}
			</div>
		);
	}
}

export default AppContent;