//if user hasn't completed the payment in stripe, will be redirected to this page

import React from "react";

export default function StripeCancel() {
  return (
    <>
      <div className="container">
        <div className="col">
          <h2 className="text-center p-5">Payment failed. Try again.</h2>
        </div>
      </div>
    </>
  );
}
