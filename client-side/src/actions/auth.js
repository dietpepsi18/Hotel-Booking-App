//all the functions that will help interact with API

import axios from "axios";

export const register = async (user) => {
  return await axios.post(`${process.env.REACT_APP_API}/register`, user);
};

export const login = async (user) => {
  return await axios.post(`${process.env.REACT_APP_API}/login`, user);
};

//for update user in the local storage
export const updateUserInLocalStorage = (user, next) => {
  if (window.localStorage.getItem("auth")) {
    let auth = JSON.parse(localStorage.getItem("auth")); //{token, user}
    auth.user = user; //update the user in auth
    localStorage.setItem("auth", JSON.stringify(auth));
    next();
  }
};
