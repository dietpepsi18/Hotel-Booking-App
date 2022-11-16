/* This page is for seller after complete the onboarding process with Stripe, 
   the seller will be redirected from Stripe to this page
   we are not going to show anything here
   This page will be just appear for around 2 seconds with loading spinner
   and then the seller will be redirected back to the dashboard

   In this component, we make request to get the updated information to find out whether the onboarding was successful
*/

import { LoadingOutlined } from "@ant-design/icons";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAccountStatus } from "../actions/stripe";
import { updateUserInLocalStorage } from "../actions/auth";

export default function StripeCallback({ history }) {
  //state
  const { auth } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();

  const accountStatus = async () => {
    try {
      const res = await getAccountStatus(auth.token);

      //update user information in local storage
      updateUserInLocalStorage(res.data, () => {
        //update user information in redux
        dispatch({
          type: "LOGGED_IN_USER",
          payload: res.data,
        });

        //redirect seller to dashboard
        window.location.href = "/dashboard/seller";
      });
    } catch (error) {
      console.log(error);
    }
  };

  //as soon as the seller is redirected to this page
  useEffect(() => {
    if (auth && auth.token) {
      accountStatus();
    }
  }, [auth]);

  return (
    <div className="d-flex justify-content-center p-5">
      <LoadingOutlined className="display-1 p-5 text-danger" />
    </div>
  );
}
