import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { DropdownButton,Dropdown } from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import Home from './home.component';
import Category from "./Category"
import Customer from "./Customer";
import CategorySearch from "./Category/components/search";
import CategoriesList from "./Category/components/list";
import CustomerSearch from './Customer/components/search';
import CustomersList from './Customer/components/list';
import AddCustomer from "./Customer/components/add";




class App extends Component {
  

  render() {
    return (
      <Router>
        <div>
          <nav className="navbar navbar-expand navbar-dark bg-dark">
            <a href="/" className="navbar-brand">
              Home
            </a>
            <div className="navbar-nav">
              <li className="nav-item">
                <DropdownButton id="dropdown-item-button" title="Customer">
                    <Dropdown.Item as="button">
                      <Link to={"/customer-search"} >Search</Link>
                    </Dropdown.Item>
                    <Dropdown.Item as="button">
                      <Link to={"/customer-add"} >Add</Link>
                    </Dropdown.Item>
                </DropdownButton>
              </li>
            </div>
            <div className="navbar-nav">
              <li className="nav-item">   
                <DropdownButton id="dropdown-item-button" title="Category">
                    <Dropdown.Item as="button">
                      <Link to={"/category-search"}>Search</Link>
                    </Dropdown.Item>
                </DropdownButton>
              </li>
            </div>
          </nav>

          <div className="container mt-3">
            <Switch>
              <Route exact path="/" component={Home}/>
              <Route exact path="/category-search" component={CategorySearch}/>
              <Route exact path="/customer-search" component={CustomerSearch}/>
              <Route exact path="/categories" component={CategoriesList} />
              <Route exact path="/customers" component={CustomersList} />
              <Route exact path="/customer-add" component={AddCustomer}/>
              <Route path="/categories/:id" component={Category} />
              <Route path="/customers/:id" component={Customer} />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
