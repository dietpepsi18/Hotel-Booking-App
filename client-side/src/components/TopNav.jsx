//TopNav is not a route, it is a regular component

import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom"; //for component to use route's properties

// TopNavigation/Menu bar: so that we can easily navigate between pages

const TopNav = () => {
  const { auth } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();
  const history = useHistory(); //so regular component can use history attribute now

  //when click Logout:
  const logout = () => {
    //reset the 'auth' state in redux to null
    dispatch({
      type: "LOGOUT",
      payload: null,
    });

    //clear the local storage
    window.localStorage.removeItem("auth");

    //redirect:
    history.push("/login");
  };

  return (
    <div className="nav bg-light d-flex justify-content-between">
      <Link className="nav-link" to="/">
        Home Page
      </Link>

      {auth === null ? null : (
        <>
          <Link className="nav-link" to="/dashboard">
            Dashboard
          </Link>
        </>
      )}

      {auth === null ? null : (
        <a className="nav-link pointer" onClick={logout}>
          Logout
        </a>
      )}
      {auth !== null ? null : (
        <>
          <Link className="nav-link" to="/login">
            Login
          </Link>
          <Link className="nav-link" to="/register">
            Register
          </Link>
        </>
      )}
    </div>
  );
};

export default TopNav;
