import React, { Component } from "react";
import CustomerDataService from "../../../services/Customer";

export default class AddCustomer extends Component {
  constructor(props) {
    super(props);
    this.onChangeFirstName = this.onChangeFirstName.bind(this);
    this.onChangeLastName = this.onChangeLastName.bind(this);
    this.onChangeEmailAddress = this.onChangeEmailAddress.bind(this);
    this.saveCustomer = this.saveCustomer.bind(this);
    this.newTutorial = this.newTutorial.bind(this);

    this.state = {
      id: null,
      firstName: "",
      lastName: "", 
      emailAddress: "", 
      published: false,

      submitted: false
    };
  }

  onChangeFirstName(e) {
    this.setState({
      firstName: e.target.value
    });
  }

  onChangeLastName(e) {
    this.setState({
      lastName: e.target.value
    });
  }

  onChangeEmailAddress(e) {
    this.setState({
      emailAddress: e.target.value
    });
  }


  saveCustomer() {
    var data = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      emailAddress:this.state.emailAddress,
    };

    CustomerDataService.create(data)
      .then(response => {
        this.setState({
          id: response.data.id,
          firstName: response.data.firstName,
          lastName: response.data.lastName,
          emailAddress: response.data.emailAddress,
          published: response.data.published,

          submitted: true
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  newTutorial() {
    this.setState({
      id: null,
      title: "",
      description: "",
      published: false,

      submitted: false
    });
  }

  render() {
    return (
      <div className="submit-form">
        {this.state.submitted ? (
          <div>
            <h4>You submitted successfully!</h4>
            <button className="btn btn-success" onClick={this.newTutorial}>
              Add
            </button>
          </div>
        ) : (
          <div>
            <div className="form-group">
              <label htmlFor="firstName">FirstName</label>
              <input
                type="text"
                className="form-control"
                id="firstName"
                required
                value={this.state.firstName}
                onChange={this.onChangeFirstName}
                name="firstName"
              />
            </div>

            <div className="form-group">
              <label htmlFor="lastName">LastName</label>
              <input
                type="text"
                className="form-control"
                id="lastName"
                required
                value={this.state.lastName}
                onChange={this.onChangeLastName}
                name="lastName"
              />
            </div>

            <div className="form-group">
              <label htmlFor="emailAddress">EmailAddress</label>
              <input
                type="text"
                className="form-control"
                id="emailAddress"
                required
                value={this.state.emailAddress}
                onChange={this.onChangeEmailAddress}
                name="emailAddress"
              />
            </div>

            <button onClick={this.saveTutorial} className="btn btn-success">
              Submit
            </button>
          </div>
        )}
      </div>
    );
  }
}
