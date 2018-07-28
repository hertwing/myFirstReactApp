import React, { Component } from "react";
import "./AddForm.css";

import _ from "lodash/fp";

const initialValues = {
  name: "",
  surname: "",
  address: "",
  gender: "-"
};

const initialErrors = {
  name: "",
  surname: "",
  address: "",
  gender: ""
};

const errorsMessages = {
  name: "Wrong name input!",
  surname: "Wrong surname input!",
  address: "Wrong adress input!",
  gender: "Select gender"
};

function hasFieldHasError(key, value) {
  return {
    name: !/^[a-zA-ZżźćńółęąśŻŹĆĄŚĘŁÓŃ]+$/.test(value) || _.isEmpty(value),
    surname: !/^[a-zA-ZżźćńółęąśŻŹĆĄŚĘŁÓŃ]+$/.test(value) || _.isEmpty(value),
    address:
       !/^[a-zA-ZżźćńółęąśŻŹĆĄŚĘŁÓŃ0-9\s.-]+\s[A-Za-zżźćńółęąśŻŹĆĄŚĘŁÓŃ0-9/]+,+\s[0-9-]+\s[a-zA-ZżźćńółęąśŻŹĆĄŚĘŁÓŃ\s]{1,} *$/.test(
       value
       ) ||
      _.isEmpty(value),
    gender: value === "-" || _.isEmpty(value)
  }[key];
}

class AddForm extends Component {
  state = {
    values: initialValues,
    errors: initialErrors
  };

  componentDidMount(){
    if(this.props.toEdit){
      this.setState(state => ({
        values: this.props.editId
      }))
    }
  }

  handleChange = (value, name) => {
    this.setState(state => ({
      values: { ...state.values, [name]: value }
    }));
  };

  setErrors = errName => {
    this.setState(state => ({
      errors: { ...state.errors, [errName]: errorsMessages[errName] }
    }));
  };

  validateForm = () => {
    const { values } = this.state;
    const fields = _.keys(values);
    const errors = fields.map(f => ({
      key: f,
      hasError: hasFieldHasError(f, values[f]),
      text: hasFieldHasError(f, values[f]) ? errorsMessages[f] : "",
      value: hasFieldHasError(f, values[f]) ? 
        this.setState(state => ({ 
          values: {...state.values, [f]: "" }
        })) : "",
    }));
    
    return new Promise((resolve, reject) => {
      const hasErrors = _.some({ hasError: true }, errors);
      const validateErrors = 
      errors.reduce(
        (acc, current) => ({ ...acc, [current.key]: current.text }),
        {}
      );
      hasErrors ? reject(validateErrors) : resolve(values);
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    let id = 0;

    if(this.props.toEdit){
      this.validateForm()
        .then(person => {
          this.props.editPerson(this.props.editId, { ...person });
          this.props.closeAddForm();
        })
        .catch(errors => console.log(errors) || this.setState({ errors }));
    } else {
      if (this.props.people.length) {
        id = this.props.people[this.props.people.length - 1].id + 1;
      } else {
        id = 0;
      }

      this.validateForm()
      .then(person => {
        this.props.addPeople({ id, ...person });
        this.setState(state => ({
          errors: initialErrors,
          values: initialValues
        }));
      })
      .catch(errors => console.log(errors) || this.setState({ errors }));
    }
  };

  render(){
    const { values, errors } = this.state;
    return (
      <div className="Add-form-cover">
        <div className="Add-form-wrapper">
          <div className="Instructions">
            Notice that name and surname should be letters only.<br />Address
            form should be: Street name and house number, comma, zip code and
            city.
          </div>
          <form className="Add-form" onSubmit={this.handleSubmit}>
            <label>
              Name:
              <input
                type="text"
                placeholder={errors.name}
                value={values.name}
                onChange={e => this.handleChange(e.target.value, "name")}
              />
            </label>
            <label>
              Surname:
              <input
                type="text"
                placeholder={errors.surname}
                value={values.surname}
                onChange={e => this.handleChange(e.target.value, "surname")}
              />
            </label>
            <label>
              Adress:
              <input
                type="text"
                placeholder={errors.address}
                value={values.address}
                onChange={e => this.handleChange(e.target.value, "address")}
              />
            </label>
            <label className="Gender-label">
              Gender:
              <select
                value={values.gender}
                onChange={e => this.handleChange(e.target.value, "gender")}
              >
                <option value="-">-</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </label>
            <p className="Gender-error">{errors.gender}</p>
            {this.props.toEdit ? 
              <div className="Button-wrap">
                <input className="Form-button" type="submit" value="Ok" />
                <button type="button" className="Form-button" onClick={this.props.closeAddForm}>
                  Cancel
                </button>
              </div>
              :
              <div className="Button-wrap">
                <input className="Form-button" type="submit" value="Submit" />
                <button type="button" className="Form-button" onClick={this.props.closeAddForm}>
                  Exit
                </button>
              </div>
            }
          </form>
        </div>
      </div>
    );
  }
}

export default AddForm;