/* when refresh the browser, the data in redux will lost,  
  to solve that problem, we have stored the user information in local storage
  so we let the inital state be the value in local storage
*/
let userState;

//if there is value 'auth' in local storage
if (window.localStorage.getItem("auth")) {
  userState = JSON.parse(window.localStorage.getItem("auth"));
} else {
  userState = null; // {}
}

export const authReducer = (state = userState, action) => {
  switch (action.type) {
    case "LOGGED_IN_USER":
      return { ...state, ...action.payload };

    case "LOGOUT":
      return action.payload;

    default:
      return state;
  }
};
