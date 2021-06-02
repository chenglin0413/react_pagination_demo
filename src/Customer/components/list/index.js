import React, { Component } from "react";
import {connect} from 'react-redux';
import Moment from 'moment';
import Pagination from "@material-ui/lab/Pagination";
import {retrieveCustAction} from "../../actions/customersActions";
import { Table } from 'react-bootstrap';
//export excel
import ReactToExcel from 'react-html-table-to-excel';
class CustomersList extends Component {
  constructor(props) {
    super(props);
    this.retrieveCustomers = this.retrieveCustomers.bind(this);
    this.refreshData= this.refreshData.bind(this);
    this.setActiveCustomer = this.setActiveCustomer.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.handlePageSizeChange = this.handlePageSizeChange.bind(this);

    this.state = {
      currentCustomer: null,
      currentIndex: -1,
      searchTitle:props.location.state.searchTitle || "",
      // searchTitle: "",

      page: 1,
      // count: 0,
      pageSize: 10,
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
    this.props.retrieveCustAction(params);
      // .then((response) => {
      //   const { customers,totalPages } = response;
      //   this.setState({
      //     customers: customers,
      //     count: totalPages,
      //   });
      //   console.log(response);
      // })
      // .catch((e) => {
      //   console.log(e);
      // });
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

  render() {
    const {
      // searchTitle,
      // currentIndex,
      // currentCustomer,
      page,
      pageSize,
    } = this.state;
    const{ customers } =this.props.custReducer;
    const count  =this.props.custReducer.totalPages;//totalPages 作為Pagination的count
    const id = "table-to-xls";
    return (
      <div >
        <div className="col-md-12" >
          <h4>Customers List</h4>

          <div className="mt-3" >
            {"Items per Page: "}
            <select onChange={this.handlePageSizeChange} value={pageSize}>
              {this.pageSizes.map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </div>
          <br/>
          {/* <ul className="list-group">
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
          </ul>  */}
          <Table striped bordered hover id={id} >
          <thead>
            <tr>
              <th >ID</th>
              <th >First Name </th>
              <th >Last Name</th>
              <th >Email Address</th>
              <th >Date Created</th>
              <th >Challenge Answer</th>
              <th >External Id</th>
              <th >Password</th>
            </tr>
          </thead>
          <tbody>
          {customers &&
              customers.map((customer, index) => (
                <tr
                  onClick={() => this.setActiveCustomer(customer, index)}
                  key={index}
                >
                  <td>{customer.id}</td>
                  <td>{customer.firstName}</td>
                  <td>{customer.lastName}</td>
                  <td>{customer.emailAddress}</td>
                  <td>{Moment.utc(customer.dateCreated).local().format("YYYY-MM-DD HH:mm:ss")}</td>
                  <td>{customer.challengeAnswer}</td>
                  <td>{customer.externalId}</td>
                  <td>{customer.password}</td>
                </tr>
              ))}
          </tbody>
          
        </Table>
        </div>
        {/* <div className="col-md-12">
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
              <div>
                <label>
                  <strong>ChallengeAnswer:</strong>
                </label>{" "}
                {currentCustomer.challengeAnswer}
              </div>
              <div>
                <label>
                  <strong>LocalCode:</strong>
                </label>{" "}
                {currentCustomer.localeCode}
              </div>
              <div>
                <label>
                  <strong>Password:</strong>
                </label>{" "}
                {currentCustomer.password}
              </div>
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on a Customer...</p>
            </div>
          )}
        </div> */}
        
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
        <ReactToExcel
          table="table-to-xls"//table id 
          filename="excelFile"
          sheet="sheet 1"
          buttonText="EXPORT"
        /> 
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
      custReducer: state.customerReducer,
  };
}
//state 中的對象，是來自store內傳遞的combinerReducers(Reducer)，
// 若需要在UI組件中使用，需確認正確名稱，看當初提供的Reducer用甚麼名字
export default connect(mapStateToProps, {
  retrieveCustAction,
})(CustomersList);

