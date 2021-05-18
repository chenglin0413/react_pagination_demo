import React, { Component } from "react";
import Moment from 'moment';
import CategoryDataService from "../services/category.service";
import { Link } from "react-router-dom";
import Pagination from "@material-ui/lab/Pagination";

export default class CategoriesList extends Component {
  constructor(props) {
    super(props);
    // this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
    this.retrieveCategories = this.retrieveCategories.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveCategory = this.setActiveCategory.bind(this);
    // this.removeAllCategories = this.removeAllCategories.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.handlePageSizeChange = this.handlePageSizeChange.bind(this);

    this.state = {
      categories: [],
      currentCategory: null,
      currentIndex: -1,
      searchTitle:props.location.state.searchTitle || "",
      // searchTitle: "",

      page: 1,
      count: 0,
      pageSize: 3,
    };

    this.pageSizes = [3, 6, 9];
  }

  componentDidMount() {
    this.retrieveCategories();
  }

  // onChangeSearchTitle(e) {
  //   const searchTitle = e.target.value;

  //   this.setState({
  //     searchTitle: searchTitle,
  //   });
  // }

  getRequestParams(searchTitle, page, pageSize) {
    let params = {};

    if (searchTitle) {
      params["name"] = searchTitle;
    }

    if (page) {
      params["page"] = page - 1;
    }

    if (pageSize) {
      params["size"] = pageSize;
    }

    return params;
  }

  retrieveCategories() {
    const { searchTitle, page, pageSize } = this.state;
    console.log("searchTitle:"+searchTitle);
    const params = this.getRequestParams(searchTitle, page, pageSize);

    CategoryDataService.getAll(params)
      .then((response) => {
        const { categories, totalPages } = response.data;
        
        this.setState({
          categories: categories,
          count: totalPages,
        });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveCategories();
    this.setState({
      currentCategory: null,
      currentIndex: -1,
    });
  }

  setActiveCategory(category, index) {
    this.setState({
      currentCategory: category,
      currentIndex: index,
    });
  }

  // removeAllCategories() {
  //   CategoryDataService.deleteAll()
  //     .then((response) => {
  //       console.log(response.data);
  //       this.refreshList();
  //     })
  //     .catch((e) => {
  //       console.log(e);
  //     });
  // }

  handlePageChange(event, value) {
    this.setState(
      {
        page: value,
      },
      () => {
        this.retrieveCategories();
      }
    );
  }

  handlePageSizeChange(event) {
    this.setState(
      {
        pageSize: event.target.value,
        page: 1
      },
      () => {
        this.retrieveCategories();
      }
    );
  }

  render() {
    const {
      // searchTitle,
      categories,
      currentCategory,
      currentIndex,
      page,
      count,
      pageSize,
    } = this.state;

    return (
      <div className="list row">
        {/* <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by name"
              value={searchTitle}
              onChange={this.onChangeSearchTitle}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.retrieveCategories}
              >
                Search
              </button>
            </div>
          </div>
        </div> */}
        <div className="col-md-6">
          <h4>Categories List</h4>

          <div className="mt-3">
            {"Items per Page: "}
            <select onChange={this.handlePageSizeChange} value={pageSize}>
              {this.pageSizes.map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>

            <Pagination
              className="my-3"
              count={count}
              page={page}
              siblingCount={1}
              boundaryCount={1}
              variant="outlined"
              shape="rounded"
              onChange={this.handlePageChange}
            />
          </div>

          <ul className="list-group">
            {categories &&
              categories.map((category, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveCategory(category, index)}
                  key={index}
                >
                  {category.name}
                </li>
              ))}
          </ul>

          <button
            className="m-3 btn btn-sm btn-danger"
            // onClick={this.removeAllCategories}
          >
            Remove All
          </button>
        </div>
        <div className="col-md-6">
          {currentCategory ? (
            <div>
              <h4>Category</h4>
              <div>
                <label>
                  <strong>Name:</strong>
                </label>{" "}
                {currentCategory.name}
              </div>
              <div>
                <label>
                  <strong>Description:</strong>
                </label>{" "}
                {currentCategory.description}
              </div>
              <div>
                <label>
                  <strong>LongDescription:</strong>
                </label>{" "}
                {currentCategory.long_description}
              </div>
              <div>
                <label>
                  <strong>Start_Date:</strong>
                </label>{" "}
                {Moment.utc(currentCategory.start_date).local().format("YYYY-MM-DD HH:mm:ss")}
              </div>

              <Link
                to={"/categories/" + currentCategory.id}
                className="badge badge-warning"
              >
                Edit
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on a Category...</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}
