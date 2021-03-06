import React, { Component } from "react";
import {connect} from 'react-redux';
import Moment from 'moment';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import ToolkitProvider,{Search } from 'react-bootstrap-table2-toolkit';
import filterFactory from 'react-bootstrap-table2-filter';
import { Button,Modal} from 'react-bootstrap';
// import { Button,Modal,ModalHeader, ModalBody, ModalFooter  } from 'reactstrap';
import {retrieveCustAction} from "../../actions/customersActions";
import ExportCSVBtn from './ExportCSVBtn';




class CustomersList extends Component {
  constructor(props) {
    super(props);
    this.retrieveCustomers = this.retrieveCustomers.bind(this);



    this.state = {
      searchTitle:props.location.state.searchTitle || "",
      modal: false,
      modalInfo:[],
      // count:1,
    };
  }

  componentDidMount() {
    this.retrieveCustomers();
  }
  

  retrieveCustomers() {
    const { searchTitle} = this.state;
    console.log("searchTitle:"+searchTitle);
    // const params = this.getRequestParams(searchTitle);
    const params = {"firstName":searchTitle};
    this.props.retrieveCustAction(params);
  }
  toggle =()=>{
    this.setState({
      modal: !this.state.modal,
    })
  }
  setModalInfo =(rowData)=>{
    this.setState({
      modalInfo:rowData,
    })
  }

  render() {
    

    function changeDateFormat(cellval) {
         return Moment.utc(cellval).local().format("YYYY-MM-DD HH:mm:ss");
     }

    const rowEvents ={
      onClick:(e,row)=>{
        console.log(row)
        this.toggle()
        this.setModalInfo(row)
      }
    }


    
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
    // const count  =this.props.totalPages;//totalPages ??????Pagination???count
    let customersDataTable =[];//??????Bootstrap Data Table ??????
    if(customers) customersDataTable=customers;//?????????????????????????????????
    const {modalInfo} = this.state;
    const { SearchBar } = Search;
    return (
      <div >
        <Modal show={this.state.modal} onHide={this.toggle}>
          <Modal.Header closeButton>
            <Modal.Title>??????????????? :</Modal.Title>
          </Modal.Header>
          <Modal.Body>
             {modalInfo.customerRoles && modalInfo.customerRoles.map((data,index) => {
               return(
                 <div  style={{color:'green',backgroundColor: '#75f0dc'}}key={index}>{data.roleName}</div>
               )
             })}
          </Modal.Body>
          <Modal.Footer>
              <Button color="secondary" onClick={this.toggle}>??????</Button>
          </Modal.Footer>
        </Modal>
        <h4>Customers List</h4>
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
                <SearchBar { ...props.searchProps } placeholder={"?????????????????????"} />
                <BootstrapTable { ...props.baseProps }
                  pagination={paginationFactory()}
                  filter={ filterFactory()}
                  rowEvents={rowEvents}
                  striped
                  hover
                  condensed
                  
                />
              </div>
            )
          }
        </ToolkitProvider>
        
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
//state ????????????????????????store????????????combinerReducers(Reducer)???
// ????????????UI????????????????????????????????????????????????????????????Reducer???????????????
export default connect(mapStateToProps, {
  retrieveCustAction,
})(CustomersList);

