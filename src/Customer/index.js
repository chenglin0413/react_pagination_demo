import React, { Component } from "react";
import CustomerDataService from "./services";
import Moment from 'moment';

export default class Customer extends Component {
  constructor(props) {
    super(props);
    this.onChangeFirstName = this.onChangeFirstName.bind(this);
    this.onChangeLastName = this.onChangeLastName.bind(this);
    this.onChangeEmailAddress = this.onChangeEmailAddress.bind(this);
    this.getCustomer = this.getCustomer.bind(this);


    this.state = {
      currentCustomer: {
        id: null,
        firstName: "",
        lastName: "",
        emailAddress:"",
        dateCreated:"",
      },
      message: ""
    };
  }

  componentDidMount() {
    this.getCustomer(this.props.match.params.id);
  }

  onChangeFirstName(e) {
    const firstName = e.target.value;

    this.setState(function(prevState) {
      return {
        currentCustomer: {
          ...prevState.currentCustomer,
          firstName: firstName
        }
      };
    });
  }

  onChangeLastName(e) {
    const lastName = e.target.value;
    
    this.setState(prevState => ({
      currentCustomer: {
        ...prevState.currentCustomer,
        lastName: lastName
      }
    }));
  }
  onChangeEmailAddress(e) {
    const emailAddress = e.target.value;
    
    this.setState(prevState => ({
      currentCustomer: {
        ...prevState.currentCustomer,
        emailAddress: emailAddress
      }
    }));
  }
  getCustomer(id) {
    CustomerDataService.get(id)
      .then(response => {
        this.setState({
          currentCustomer: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }


  render() {
    const { currentCustomer } = this.state;

    return (
      <div>
        {currentCustomer ? (
          <div className="edit-form">
            <h4>Category</h4>
            <form>
              <div className="form-group">
                <label htmlFor="firstName">firstName</label>
                <input
                  type="text"
                  className="form-control"
                  id="firstName"
                  value={currentCustomer.firstName}
                  onChange={this.onChangeFirstName}
                />
              </div>
              <div className="form-group">
                <label htmlFor="lastName">lastName</label>
                <input
                  type="text"
                  className="form-control"
                  id="lastName"
                  value={currentCustomer.lastName}
                  onChange={this.onChangeLastName}
                />
              </div>
              <div className="form-group">
                <label htmlFor="emailAddress">emailAddress</label>
                <input
                  type="text"
                  className="form-control"
                  id="emailAddress"
                  value={currentCustomer.emailAddress}
                  onChange={this.onChangeEmailAddress}
                />
              </div>
              <div className="form-group">
                <label>
                  <strong>Date_Created</strong>
                </label>
                {Moment.utc(currentCustomer.dateCreated).local().format("YYYY-MM-DD HH:mm:ss")}
              </div>
            </form>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Customer...</p>
          </div>
        )}
      </div>
    );
  }
}
