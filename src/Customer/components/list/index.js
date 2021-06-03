import React, { Component } from "react";
import {connect} from 'react-redux';
import Moment from 'moment';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import ToolkitProvider,{Search } from 'react-bootstrap-table2-toolkit';
import filterFactory from 'react-bootstrap-table2-filter';
// import * as ReactBootStrap from "react-bootstrap";

import {retrieveCustAction} from "../../actions/customersActions";
import ExportCSVBtn from './ExportCSVBtn';



class CustomersList extends Component {
  constructor(props) {
    super(props);
    this.retrieveCustomers = this.retrieveCustomers.bind(this);
    // this.refreshData= this.refreshData.bind(this);
    // this.setActiveCustomer = this.setActiveCustomer.bind(this);


    this.state = {
      // currentCustomer: null,
      // currentIndex: -1,
      searchTitle:props.location.state.searchTitle || "",
    };
  }

  componentDidMount() {
    this.retrieveCustomers();
  }

  getRequestParams(searchTitle) {
    let params = {};
    if (searchTitle) {
      params["firstName"] = searchTitle;
    }
    return params;
  }
  

  retrieveCustomers() {
    const { searchTitle} = this.state;
    console.log("searchTitle:"+searchTitle);
    const params = this.getRequestParams(searchTitle);
    this.props.retrieveCustAction(params);
  }

  // refreshData() {
  //   this.setState({
  //     currentCustomer: null,
  //     currentIndex: -1,
  //   });
  // }

  // setActiveCustomer(customer, index) {
  //   this.setState({
  //     currentCustomer: customer,
  //     currentIndex: index,
  //   });
  // }

  
  // handlePageChange(event, value) {
  //   this.setState(
  //     {
  //       page: value,
  //     },
  //     () => {
  //       this.retrieveCustomers();
  //     }
  //   );
  // }

  // handlePageSizeChange(event) {
  //   this.setState(
  //     {
  //       pageSize: event.target.value,
  //       page: 1
  //     },
  //     () => {
  //       this.retrieveCustomers();
  //     }
  //   );
  // }
 


  render() {
    function changeDateFormat(cellval) {
         return Moment.utc(cellval).local().format("YYYY-MM-DD HH:mm:ss");
    }
    const { SearchBar } = Search;
    const columns =[
      {dataField:"id",text:"ID",sort:true},
      {dataField:"firstName",text:"First Name"},
      {dataField:"lastName",text:"Last Name"},
      {dataField:"emailAddress",text:"Email Address"},
      {dataField:"dateCreated",text:"Date Created",formatter: value => (changeDateFormat(value))},
      {dataField:"challengeAnswer",text:"Challenge Answer"},
      {dataField:"externalId",text:"External Id"},
      {dataField:"password",text:"Password"},
    ]
    
    const {customers}  =this.props;
    // const count  =this.props.totalPages;//totalPages 作為Pagination的count
    let customersDataTable =[];//做為Bootstrap Data Table 使用
    if(customers) customersDataTable=customers;//如果資料回傳後才傳遞。
    const rowStyle = {   padding: '0px' };
    const headerStyle = { 
      
    };
    return (
      <div >
        <h4>Customers List</h4>
        {/* <BootstrapTable 
        id={id}
        keyField="id"
        data={customersDataTable}
        columns={columns}
        pagination={paginationFactory()}/> */}
        <ToolkitProvider
        
          keyField="id"
          data={ customersDataTable }
          columns={ columns }
          exportCSV={ { onlyExportFiltered: true, exportAll: false } }
          search
        >
          {
            props => (
              <div>
                <ExportCSVBtn { ...props.csvProps }>Export Filter Data To CSV!!</ExportCSVBtn>
                <hr />
                <SearchBar { ...props.searchProps } placeholder={"請輸入篩選字串"} />
                <BootstrapTable { ...props.baseProps }
                  pagination={paginationFactory()}
                  filter={ filterFactory()}
                  striped
                  hover
                  condensed
                />
              </div>
            )
          }
        </ToolkitProvider>

          

          {/* <Table striped bordered hover id={id} >
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
          </Table> */}
        {/* </div> */}

        
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    customers: state.customerReducer.customers,
    // totalPages: state.customerReducer.totalPages,
  };
}
//state 中的對象，是來自store內傳遞的combinerReducers(Reducer)，
// 若需要在UI組件中使用，需確認正確名稱，看當初提供的Reducer用甚麼名字
export default connect(mapStateToProps, {
  retrieveCustAction,
})(CustomersList);

