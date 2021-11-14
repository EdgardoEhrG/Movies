import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Movies from "./components/Movies/Movies";
import Movie from "./components/Movies/Movie";
import Admin from "./components/Admin/Admin";
import Home from "./components/Home/Home";
import Genres from "./components/Genres/Genres";
import Genre from "./components/Genres/Genre";
import EditMovie from "./components/Movies/EditMovie";
import Login from "./components/Login/Login";
import Navigation from "./components/Navigation/Navigation";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./App.scss";

const App = () => {
  const [jwt, setJwt] = useState("");

  useEffect(() => {
    let token = window.localStorage.getItem("jwt");
    if (token) {
      setJwt(token);
    }
  }, []);

  const logOut = () => {
    setJwt("");
    window.localStorage.removeItem("jwt");
  };

  return (
    <Router>
      <div className="container">
        <div className="row">
          <div className="col mt-3">
            <h1 className="mt-3">Go watch a movie</h1>
          </div>
          <div className="col mt-3 text-end">
            {jwt === "" ? (
              <Link to="/login">LogIn</Link>
            ) : (
              <Link to="/logout" onClick={logOut}>
                LogOut
              </Link>
            )}
          </div>
        </div>
        <div className="row">
          <div className="col-md-2">
            <Navigation jwt={jwt} />
          </div>
          <div className="col-md-10">
            <Switch>
              <Route
                exact
                path="/login"
                component={(props) => <Login {...props} handleJWT={setJwt} />}
              />
              <Route exact path="/movies" component={Movies} />
              <Route exact path="/movies/:id" component={Movie} />
              <Route exact path="/genres" component={Genres} />
              <Route exact path="/genre/:id" component={Genre} />
              <Route exact path="/admin" component={Admin} />
              <Route exact path="/admin/add" component={EditMovie} />
              <Route
                exact
                path="/admin/movie/:id"
                component={(props) => <EditMovie {...props} jwt={jwt} />}
              />
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
