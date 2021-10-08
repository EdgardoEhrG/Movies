import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Movies from "./components/Movies/Movies";
import Movie from "./components/Movies/Movie";
import Admin from "./components/Admin/Admin";
import Home from "./components/Home/Home";
import Categories from "./components/Categories/Categories";
import Navigation from "./components/Navigation/Navigation";

import "./App.scss";

const App = () => {
  return (
    <Router>
      <div className="container">
        <div className="row">
          <h1 className="mt-3">Go watch a movie</h1>
          <hr className="mb-3" />
        </div>
        <div className="row">
          <div className="col-md-2">
            <Navigation />
          </div>
          <div className="col-md-10">
            <Switch>
              <Route path="/movies" component={Movies} />
              <Route path="/movies/:id" component={Movie} />
              <Route exact path="/by-category" component={Categories} />
              <Route path="/admin" component={Admin} />
              <Route path="/" component={Home} />
            </Switch>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default App;
