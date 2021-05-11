import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddCategory from "./components/add-category.component";
import Category from "./components/category.component";
import CategoriesList from "./components/categories-list.component";
import CategorySearch from "./components/category-search.component";
class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <nav className="navbar navbar-expand navbar-dark bg-dark">
            <a href="/" className="navbar-brand">
              Home
            </a>
            <div className="navbar-nav mr-auto">
              {/* <li className="nav-item">
                <Link to={"/categories"} className="nav-link">
                  Categories
                </Link>
              </li> */}
              <li className="nav-item">
                <Link to={"/add"} className="nav-link">
                  Add
                </Link>
              </li>
            </div>
          </nav>

          <div className="container mt-3">
            <Switch>
              <Route exact path="/" component={CategorySearch}/>
              <Route exact path={["/categories"]} component={CategoriesList} />
              <Route exact path="/add" component={AddCategory} />
              <Route path="/categories/:id" component={Category} />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
