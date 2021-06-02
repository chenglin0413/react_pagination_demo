import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { NavDropdown,Navbar ,Nav} from 'react-bootstrap';
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
           
           <Navbar bg="dark"  variant="dark" expand="lg">
            <Navbar.Brand href="/">Home</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
                <NavDropdown title="Customer" id="basic-nav-dropdown">
                    <NavDropdown.Item href="/customer-search">Search</NavDropdown.Item>
                    <NavDropdown.Item href="/customer-add">Add</NavDropdown.Item>
                </NavDropdown>
                <NavDropdown title="Category" id="basic-nav-dropdown">
                    <NavDropdown.Item href="/category-search">Search</NavDropdown.Item>
                </NavDropdown>
              </Nav>
             
            </Navbar.Collapse> 
          </Navbar> 
          

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
