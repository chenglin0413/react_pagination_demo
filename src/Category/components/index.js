import React, { Component } from "react";
import CategoryDataService from "../services";
import Moment from 'moment';

export default class Category extends Component {
  constructor(props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeLongDescription = this.onChangeLongDescription.bind(this);
    this.getCategory = this.getCategory.bind(this);
    // this.updatePublished = this.updatePublished.bind(this);
    // this.updateTutorial = this.updateTutorial.bind(this);
    // this.deleteTutorial = this.deleteTutorial.bind(this);

    this.state = {
      currentCategory: {
        id: null,
        name: "",
        description: "",
        longDescription: "",
        start_date: "",
      },
      message: ""
    };
  }

  componentDidMount() {
    this.getCategory(this.props.match.params.id);
  }

  onChangeName(e) {
    const name = e.target.value;

    this.setState(function(prevState) {
      return {
        currentCategory: {
          ...prevState.currentCategory,
          name: name
        }
      };
    });
  }

  onChangeDescription(e) {
    const description = e.target.value;
    
    this.setState(prevState => ({
      currentCategory: {
        ...prevState.currentCategory,
        description: description
      }
    }));
  }
  onChangeLongDescription(e) {
    const longDescription = e.target.value;
    
    this.setState(prevState => ({
      currentCategory: {
        ...prevState.currentCategory,
        longDescription: longDescription
      }
    }));
  }
  getCategory(id) {
    CategoryDataService.get(id)
      .then(response => {
        this.setState({
          currentCategory: response.data
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
    const { currentCategory } = this.state;

    return (
      <div>
        {currentCategory ? (
          <div className="edit-form">
            <h4>Category</h4>
            <form>
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  value={currentCategory.name}
                  onChange={this.onChangeName}
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  value={currentCategory.description}
                  onChange={this.onChangeDescription}
                />
              </div>
              <div className="form-group">
                <label htmlFor="longDescription">longDescription</label>
                <input
                  type="text"
                  className="form-control"
                  id="longDescription"
                  value={currentCategory.longDescription}
                  onChange={this.onChangeLongDescription}
                />
              </div>
              <div className="form-group">
                <label>
                  <strong>Start_Date:</strong>
                </label>
                {Moment.utc(currentCategory.start_date).local().format("YYYY-MM-DD HH:mm:ss")}
              </div>
            </form>

            {currentCategory.published ? (
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
            <p>Please click on a Category...</p>
          </div>
        )}
      </div>
    );
  }
}
