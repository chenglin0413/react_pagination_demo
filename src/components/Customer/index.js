import React, { Component } from "react";
import CustomerDataService from "../../services/Customer";
import Moment from 'moment';

export default class Customer extends Component {
  constructor(props) {
    super(props);
    this.onChangeFirstName = this.onChangeFirstName.bind(this);
    this.onChangeLastName = this.onChangeLastName.bind(this);
    this.onChangeEmailAddress = this.onChangeEmailAddress.bind(this);
    this.getCustomer = this.getCustomer.bind(this);
    // this.updatePublished = this.updatePublished.bind(this);
    // this.updateTutorial = this.updateTutorial.bind(this);
    // this.deleteTutorial = this.deleteTutorial.bind(this);

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

  // updatePublished(status) {
  //   var data = {
  //     id: this.state.currentCategory.id,
  //     title: this.state.currentCategory.title,
  //     description: this.state.currentCategory.description,
  //     published: status
  //   };

  //   CategoryDataService.update(this.state.currentCategory.id, data)
  //     .then(response => {
  //       this.setState(prevState => ({
  //         currentCategory: {
  //           ...prevState.currentCategory,
  //           published: status
  //         }
  //       }));
  //       console.log(response.data);
  //     })
  //     .catch(e => {
  //       console.log(e);
  //     });
  // }

  // updateTutorial() {
  //   CategoryDataService.update(
  //     this.state.currentCategory.id,
  //     this.state.currentCategory
  //   )
  //     .then(response => {
  //       console.log(response.data);
  //       this.setState({
  //         message: "The tutorial was updated successfully!"
  //       });
  //     })
  //     .catch(e => {
  //       console.log(e);
  //     });
  // }

  // deleteTutorial() {    
  //   CategoryDataService.delete(this.state.currentCategory.id)
  //     .then(response => {
  //       console.log(response.data);
  //       this.props.history.push('/tutorials')
  //     })
  //     .catch(e => {
  //       console.log(e);
  //     });
  // }

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

            {currentCustomer.published ? (
              <button
                className="badge badge-primary mr-2"
                // onClick={() => this.updatePublished(false)}
              >
                UnPublish
              </button>
            ) : (
              <button
                className="badge badge-primary mr-2"
                // onClick={() => this.updatePublished(true)}
              >
                Publish
              </button>
            )}

            <button
              className="badge badge-danger mr-2"
              // onClick={this.deleteTutorial}
            >
              Delete
            </button>

            <button
              type="submit"
              className="badge badge-success"
              // onClick={this.updateTutorial}
            >
              Update
            </button>
            <p>{this.state.message}</p>
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
