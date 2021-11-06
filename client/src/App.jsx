import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Movies from "./components/Movies/Movies";
import Movie from "./components/Movies/Movie";
import Admin from "./components/Admin/Admin";
import Home from "./components/Home/Home";
import Genres from "./components/Genres/Genres";
import Genre from "./components/Genres/Genre";
import EditMovie from "./components/Movies/EditMovie";
import Navigation from "./components/Navigation/Navigation";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
              <Route exact path="/movies" component={Movies} />
              <Route exact path="/movies/:id" component={Movie} />
              <Route exact path="/genres" component={Genres} />
              <Route exact path="/genre/:id" component={Genre} />
              <Route exact path="/admin" component={Admin} />
              <Route exact path="/admin/add" component={EditMovie} />
              <Route exact path="/admin/movie/:id" component={EditMovie} />
              <Route exact path="/" component={Home} />
            </Switch>
          </div>
        </div>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </div>
    </Router>
  );
};

export default App;
