import React, { Component } from "react";
import Moment from 'moment';
// import { Link } from "react-router-dom";
import Pagination from "@material-ui/lab/Pagination";
import {connect} from 'react-redux';
import {retrieveCateAction} from "../../actions/categoryAction";
import { Table } from 'react-bootstrap';

class CategoriesList extends Component {
  constructor(props) {
    super(props);
    this.retrieveCategories = this.retrieveCategories.bind(this);
    this.refreshData = this.refreshData.bind(this);
    this.setActiveCategory = this.setActiveCategory.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.handlePageSizeChange = this.handlePageSizeChange.bind(this);

    this.state = {
      currentCategory: null,
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
    this.retrieveCategories();
  }


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
    this.props.retrieveCateAction(params);
      // .then(response => {
      //   const { categories, totalPages } = response.data;
      //   this.setState({
      //     categories: categories,
      //     count: totalPages,
      //   });
      //   console.log(response.data);
      // })
      // .catch((e) => {
      //   console.log(e);
      // });
  }

  refreshData() {
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
      page,
      // count,
      pageSize,
    } = this.state;
    const {categories} = this.props.cateReducer;
    const count = this.props.cateReducer.totalPages;//totalPages 作為Pagination的count
    
    return (
      <div>
        <div className="col-md-12">
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
            
            
          </div>
          <br/>
          <Table striped bordered hover >
          <thead>
            <tr>
              <th >ID</th>
              <th >Name </th>
              <th >Description</th>
              <th >Long Description</th>
              <th >Start Date</th>
            </tr>
          </thead>
          <tbody>
          {categories &&
            categories.map((category, index) => (
                <tr
                  onClick={() => this.setActiveCategory(category, index)}
                  key={index}
                >
                  <td>{category.id}</td>
                  <td>{category.name}</td>
                  <td>{category.description}</td>
                  <td>{category.long_description}</td>
                  <td>{Moment.utc(category.start_date).local().format("YYYY-MM-DD HH:mm:ss")}</td>
                </tr>
              ))}
          </tbody>
        </Table>


        </div>
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
    );
  }
}

const mapStateToProps = (state) =>{
  return{
    cateReducer:state.categoryReducer,
  };
}
//state 中的對象，是來自store內傳遞的combinerReducers(Reducer)，
// 若需要在UI組件中使用，需確認正確名稱，看當初提供的Reducer用甚麼名字
export default connect(mapStateToProps, {
  retrieveCateAction,
})(CategoriesList);