/* After logged in, there are some pages that only logged in user can see
   so we will create a protected page that is accessible only for logged in users */

import { Redirect, Route } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PrivateRoute({ ...rest }) {
  const { auth } = useSelector((state) => ({ ...state }));

  if (auth && auth.token) {
    return <Route {...rest} />;
  } else {
    return <Redirect to="/login" />;
  }
}
