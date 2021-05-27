import React, { Component } from "react";
import {connect} from 'react-redux';
import Moment from 'moment';
import {retrieveCustAction} from "../../../actions/customersActions";
// import CustomerDataService from '../../../services/Customer';
import { Link } from "react-router-dom";
import Pagination from "@material-ui/lab/Pagination";

class CustomersList extends Component {
  constructor(props) {
    super(props);
    this.retrieveCustomers = this.retrieveCustomers.bind(this);
    this.refreshData= this.refreshData.bind(this);
    this.setActiveCustomer = this.setActiveCustomer.bind(this);
    // this.removeAllCategories = this.removeAllCategories.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.handlePageSizeChange = this.handlePageSizeChange.bind(this);

    this.state = {
      currentCustomer: null,
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
    this.retrieveCustomers();
  }

  getRequestParams(searchTitle, page, pageSize) {
    let params = {};
    if (searchTitle) {
      params["firstName"] = searchTitle;
    }
    if (page) {
      params["page"] = page - 1;
    }
    if (pageSize) {
      params["size"] = pageSize;
    }
    return params;
  }

  retrieveCustomers() {
    const { searchTitle, page, pageSize } = this.state;
    console.log("searchTitle:"+searchTitle);
    const params = this.getRequestParams(searchTitle, page, pageSize);

    this.props
    .retrieveCustAction(params)
      .then((response) => {
        console.log(response);
        const { customers, totalPages } = response;
        this.setState({
          customers: customers,
          count: totalPages,
        });
        console.log(response);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  refreshData() {
    this.setState({
      currentCustomer: null,
      currentIndex: -1,
    });
  }

  setActiveCustomer(customer, index) {
    this.setState({
      currentCustomer: customer,
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
        this.retrieveCustomers();
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
        this.retrieveCustomers();
      }
    );
  }
  findByFirstName() {
    this.refreshData();
    this.props.findCustomersByFirstName(this.state.searchTitle);
  }
  render() {
    const {
      // searchTitle,
      customers,
      currentCustomer,
      currentIndex,
      page,
      count,
      pageSize,
    } = this.state;

    return (
      <div className="list row">
        <div className="col-md-6">
          <h4>Customers List</h4>

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
            {customers &&
              customers.map((customer, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveCustomer(customer, index)}
                  key={index}
                >
                  {customer.firstName}
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
          {currentCustomer ? (
            <div>
              <h4>Customer</h4>
              <div>
                <label>
                  <strong>FirstName:</strong>
                </label>{" "}
                {currentCustomer.firstName}
              </div>
              <div>
                <label>
                  <strong>LastName:</strong>
                </label>{" "}
                {currentCustomer.lastName}
              </div>
              <div>
                <label>
                  <strong>EmailAddress:</strong>
                </label>{" "}
                {currentCustomer.emailAddress}
              </div>
              <div>
                <label>
                  <strong>DateCreated:</strong>
                </label>{" "}
                {Moment.utc(currentCustomer.dateCreated).local().format("YYYY-MM-DD HH:mm:ss")}
              </div>

              <Link
                to={"/customers/" + currentCustomer.id}
                className="badge badge-warning"
              >
                Edit
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on a Customer...</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
      customers: state.customers
  };
}

export default connect(mapStateToProps, {
  retrieveCustAction,
})(CustomersList);

