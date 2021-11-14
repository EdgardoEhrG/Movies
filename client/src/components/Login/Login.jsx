import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import CustomInput from "../components/CustomInput/CustomInput";

import { toast } from "react-toastify";
import axios from "axios";

const Login = ({ handleJWT }) => {
  const history = useHistory();

  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState([]);

  const handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;

    setUserInfo({
      ...userInfo,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (userInfo.email === "") {
      setErrors((arr) => [...arr, "email"]);
    }

    if (userInfo.password === "") {
      setErrors((arr) => [...arr, "password"]);
    }

    if (errors.length > 0) {
      return;
    }

    const data = new FormData(e.target);
    const payload = Object.fromEntries(data.entries());

    const res = await axios.post("http://localhost:4000/v1/signin", payload);

    if (res.status() > 200) {
      toast.error("Smt went wrong...");
    }

    if (res.data) {
      handleJWTChange(res.data);
      window.localStorage.setItem("jwt", res.data);
      history.push("/admin");
    }
  };

  const handleJWTChange = (jwt) => {
    handleJWT(jwt);
  };

  const hasError = (key) => {
    return errors.indexOf(key) !== -1;
  };

  return (
    <>
      <h2>Login</h2>

      <form className="pt-3">
        <CustomInput
          title="Email"
          type="email"
          name="email"
          handleChange={handleChange}
          className={hasError("email") ? "is-valid" : ""}
          errorDiv={hasError("email" ? "text-danger" : "d-none")}
          errorMsg="Please enter a valid email address"
        />
        <CustomInput
          title="Password"
          type="password"
          name="password"
          handleChange={handleChange}
          className={hasError("password") ? "is-valid" : ""}
          errorDiv={hasError("password" ? "text-danger" : "d-none")}
          errorMsg="Please enter a password"
        />
        <hr />
        <button className="btn btn-primary" onClick={handleSubmit}>
          Login
        </button>
      </form>
    </>
  );
};

export default Login;
