import React, { Component } from "react";
import {connect} from 'react-redux';
import {createCustAction,} from "../../actions/customersActions";
// import CustomerDataService from '../../services'
//FormVaildator
import FormErrors from './FormErros';

class AddCustomer extends Component {
  constructor(props) {
    super(props);
    this.saveCustomer = this.saveCustomer.bind(this);
    this.newCustomer = this.newCustomer.bind(this);

    this.state = {
      id: null,
      firstName: "",
      lastName: "", 
      emailAddress: "",
      challengeAnswer: "",
      externalId:"",
      password: "",
      customerRoles:[],
      roleName: "",
      
      
      submitted: false,
      formErrors:{firstName:"",lastName:"",emailAddress:""},
      firstNameValid: false,
      lastNameValid: false,
      emailAddressValid: false,
      formValid: false
    };
  }

  onChangeFirstName=(e)=> {
    const value = e.target.value
    const name =  e.target.name
    this.setState({
      firstName: value
    },()=>this.validateField(name,value));
  }

  onChangeLastName =(e)=> {
    const value = e.target.value
    const name =  e.target.name
    this.setState({
      lastName:value
    },()=>this.validateField(name, value));
  }

  onChangeEmailAddress =(e)=> {
    const value = e.target.value
    const name =  e.target.name
    this.setState({
      emailAddress: value
    },()=>this.validateField(name, value));
  }
  onChangeChallengeAnswer =(e)=>{
    const value = e.target.value
    this.setState({
      challengeAnswer:value
    })
  }
  onChangeExternalId =(e)=>{
    const value = e.target.value
    this.setState({
      externalId:value
    })
  }
  onChangePassword =(e)=>{
    const value = e.target.value
    this.setState({
      password:value
    })
  }
  onChangeRoleName =(e)=>{
    const value = e.target.value
    this.setState({roleName:value})
  }
  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;
    let firstNameValid = this.state.firstNameValid;
    let lastNameValid = this.state.lastNameValid;
    let emailAddressValid = this.state.emailAddressValid;
  
    switch(fieldName) {
      case 'emailAddress':
        emailAddressValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        fieldValidationErrors.emailAddress = emailAddressValid ? '' : ' is invalid';
        break;
      case 'firstName':
        firstNameValid = value.length >= 4;
        fieldValidationErrors.firstName = firstNameValid ? '': ' is too short';
        break;
      case 'lastName':
        lastNameValid = value.length >= 6 && value.length <= 20;
        fieldValidationErrors.lastName = lastNameValid ? '': ' is too short';
        break;
      default:
        break;
    }
    this.setState({formErrors: fieldValidationErrors,
                    firstNameValid: firstNameValid,
                    lastNameValid: lastNameValid,
                    emailAddressValid: emailAddressValid,
                  }, this.validateForm);
  }
  
  validateForm() {
    this.setState({formValid: this.state.firstNameValid && this.state.lastNameValid && this.state.emailAddressValid });
  }

  saveCustomer() {
    const customerRole = {"roleName":this.state.roleName};
    const data = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      emailAddress:this.state.emailAddress,
      challengeAnswer:this.state.challengeAnswer,
      externalId:this.state.externalId,
      password:this.state.password,
      customerRoles:[customerRole],
    };
    console.log(data);
    this.props
    .createCustAction(data)
      .then(response => {
        this.setState({
          id: response.id,
          firstName: response.firstName,
          lastName: response.lastName,
          emailAddress: response.emailAddress,
          challengeAnswer: response.challengeAnswer,
          externalId: response.externalId,
          password: response.password,

          submitted: true
        });
        console.log(response);
      })
      .catch(e => {
        console.log(e);
      });
  }

  newCustomer() {
    this.setState({
      id: null,
      firstName: "",
      lastName: "",
      emailAddress: "",
      challengeAnswer: "",
      externalId: "",
      password: "",
      roleName: "",

      submitted: false
    });
  }

  // errorClass(error){
  //   return (error.length===0 ? '':'has-error');
  // }

  render() {
    return (
      <div className="submit-form">
        {this.state.submitted ? (
          <div>
            <h4>You submitted successfully!</h4>
            <button className="btn btn-success" onClick={this.newCustomer}>
              Add
            </button>
          </div>
        ) : (
          <div>
          <div className='form-group'>
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

            <div className='form-group'>
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

            <div className='form-group'>
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
            <div className='form-group'>
              <label htmlFor="challengeAnswer">ChallengeAnswer</label>
              <input
                type="text"
                className="form-control"
                id="challengeAnswer"
                required
                value={this.state.challengeAnswer}
                onChange={this.onChangeChallengeAnswer}
                name="challengeAnswer"
              />
            </div>
            <div className='form-group'>
              <label htmlFor="externalId">ExternalId</label>
              <input
                type="text"
                className="form-control"
                id="externalId"
                required
                value={this.state.externalId}
                onChange={this.onChangeExternalId}
                name="externalId"
              />
            </div>
            <div className='form-group'>
              <label htmlFor="password">Password</label>
              <input
                type="text"
                className="form-control"
                id="password"
                required
                value={this.state.password}
                onChange={this.onChangePassword}
                name="password"
              />
            </div>
            <hr />
            <div className='form-group'>
              <label htmlFor="roleName">Role Name</label>
              <input
                type="text"
                className="form-control"
                id="roleName"
                required
                value={this.state.roleName}
                onChange={this.onChangeRoleName}
                name="roleName"
              />
            </div>
            <div className="panel panel-default">
              <FormErrors formErrors={this.state.formErrors} />
            </div>
            <button disabled={!this.state.formValid} onClick={this.saveCustomer} className="btn btn-success">
              Submit
            </button>
          </div>
        )}
      </div>
    );
  }
}

//??????connect()()?????????????????????AddCustomer???????????????
export default connect(null, //????????????
  { createCustAction, }//???????????????????????????
  )(AddCustomer);