/* after user has successfully completed the payment in stripe, will be redirected to this page
    we use useEffect() on this page to make request to backend
    so that we can create a new order (in database) for the user who paid for booking
    so that we can show the booking in user purchase/booking history
*/
import React from "react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { stripeSuccessRequest } from "../actions/stripe";
import { LoadingOutlined } from "@ant-design/icons";

export default function StripeSuccess({ match, history }) {
  //redux state:
  const { auth } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    stripeSuccessRequest(auth.token, match.params.hotelId).then((res) => {
      if (res.data.success) {
        history.push("/dashboard");
      } else {
        history.push("/stripe/cancel");
      }
    });
  }, [match.params.hotelId]);

  return (
    <>
      <div className="container">
        <div className="d-flex justify-content-center p-5">
          <LoadingOutlined className="display-1 text-danger p-5" />
        </div>
      </div>
    </>
  );
}
