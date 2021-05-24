import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class CustomerSearch extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);

    this.state = {
      searchTitle: "",
    };
  }

  onChangeSearchTitle(e) {
    const searchTitle = e.target.value;

    this.setState({
      searchTitle: searchTitle,
    });
  }

  render() {
    const {
      searchTitle,
    } = this.state;

    return (
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by fisrt name"
              value={searchTitle}
              onChange={this.onChangeSearchTitle}
            />
            <div className="input-group-append">
              <Link
                to={{pathname:"/customers",state:{searchTitle}}}
                 className="btn btn-outline-secondary"
              >
                Customer search
              </Link>
            </div>
          </div>
        </div>


      </div>
    );
  }
}
