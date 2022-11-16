/* Login page */

import React from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import { login } from "../actions/auth";
import LoginForm from "../components/LoginForm";
import { useDispatch } from "react-redux";

const Login = ({ history }) => {
  //create a state:
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  //'submit' button event handler
  const handleSubmit = async (event) => {
    event.preventDefault(); //make sure when click the button, the page will not reload
    console.log("Send Login Data: ", { email, password });

    try {
      let res = await login({
        email: email,
        password: password,
      });

      if (res.data) {
        //res.data contains：{token: ..., user: ...}

        //1) save user and token to local storage
        window.localStorage.setItem("auth", JSON.stringify(res.data));

        //2) save user and token to redux
        dispatch({
          type: "LOGGED_IN_USER",
          payload: res.data,
        });

        //3) redirect to the home page
        history.push("/dashboard");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data);
    }
  };

  //------------------------------------return----------------------------------
  return (
    <>
      <div className="container-fluid p-5 text-center bg-secondary">
        <h1>Login</h1>
      </div>

      <div className="container">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <LoginForm
              handleSubmit={handleSubmit}
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
