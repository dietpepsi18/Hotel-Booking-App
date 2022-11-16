import axios from "axios";

export const createConnectAccount = async (token) => {
  return await axios.post(
    `${process.env.REACT_APP_API}/create-connect-account`,
    {}, //sending data
    {
      //sending in HTTP headers
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

//after the seller finished the onboarding process in stripe, the seller will be redirected from Stripe to /stripe/callback
//in the StripeCallback component, we need to make request to the backend
export const getAccountStatus = async (token) => {
  return await axios.post(
    `${process.env.REACT_APP_API}/get-account-status`,
    {}, //sending data
    {
      //sending in HTTP headers
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

//on seller's dashborad, there is a 'Spending balance' card, we need to request to the backend
export const getAccountBalance = async (token) => {
  return await axios.post(
    `${process.env.REACT_APP_API}/get-account-balance`,
    {}, //sending data
    {
      //sending in HTTP headers
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

//for setting the currency style
export const currencyFormatter = (data) => {
  return (data.amount / 100).toLocaleString(data.currency, {
    style: "currency",
    currency: data.currency,
  });
};

//for Payout settings in seller's dashboard: request backend to get a one time usable login link
export const payoutSetting = async (token) => {
  return await axios.post(
    `${process.env.REACT_APP_API}/payout-setting`,
    {}, //sending data
    {
      //sending in HTTP headers
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

//for buyer booking a hotel, frontend need to get a session ID from backend, and backend get it from stripe
export const getSessionId = async (token, hotelId) => {
  return await axios.post(
    `${process.env.REACT_APP_API}/stripe-session-id`,
    { hotelId }, //sending data
    {
      //sending in HTTP headers
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

// for after user successfully completed the payment in stripe, at the /stripe/success page
// we make request to backend to create a new order (in database) for the user
export const stripeSuccessRequest = async (token, hotelId) => {
  return await axios.post(
    `${process.env.REACT_APP_API}/stripe-success`,
    { hotelId }, //sending data
    {
      //sending in HTTP headers
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
