import Home from "./booking/Home.jsx";
import Login from "./auth/Login.jsx";
import Register from "./auth/Register.jsx";
import TopNav from "./components/TopNav.jsx";
import Dashboard from "./user/Dashboard.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";
import DashboardSeller from "./user/DashboardSeller.jsx";
import NewHotel from "./hotels/NewHotel.jsx";
import StripeCallback from "./stripe/StripeCallback.jsx";
import EditHotel from "./hotels/EditHotel.jsx";
import ViewHotel from "./hotels/ViewHotel.jsx";
import StripeSuccess from "./stripe/StripeSuccess.jsx";
import StripeCancel from "./stripe/StripeCancel.jsx";
import SearchResult from "./hotels/SearchResult.jsx";

import React from "react";
import { Switch, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  //inside <Switch>, each <Route> can be treat as a page
  return (
    <div>
      <TopNav />
      <ToastContainer position="top-center" />

      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <PrivateRoute exact path="/dashboard" component={Dashboard} />
        <PrivateRoute
          exact
          path="/dashboard/seller"
          component={DashboardSeller}
        />
        <PrivateRoute exact path="/hotels/new" component={NewHotel} />
        <PrivateRoute
          exact
          path="/stripe/callback"
          component={StripeCallback}
        />
        <PrivateRoute exact path="/hotel/edit/:hotelId" component={EditHotel} />
        <Route exact path="/hotel/:hotelId" component={ViewHotel} />
        <PrivateRoute
          exact
          path="/stripe/success/:hotelId"
          component={StripeSuccess}
        />
        <PrivateRoute exact path="/stripe/cancel" component={StripeCancel} />
        <Route exact path="/search-result" component={SearchResult} />
      </Switch>
    </div>
  );
}

export default App;
