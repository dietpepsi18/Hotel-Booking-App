import User from "../mongoDB_models/user.js"; //User is userModel
import jwt from "jsonwebtoken";
import queryString from "query-string"; //this will help us create a login link with some parameters in URL
import Hotel from "../mongoDB_models/hotel.js";
import Order from "../mongoDB_models/order.js";

const stripe = require("stripe")(process.env.STRIPE_SECRET);

/* ===================================================================================================== */

export const createConnectedAccount = async (req, res) => {
  // req.user:  { _id: '63695a832c848e451c9d096c', iat: 1667930688, exp: 1668017088 }
  //1） find user from database
  const user = await User.findById(req.user._id).exec();
  console.log("USER ====> ", user);

  //2) if-user don't have stripe_account_id yet, create a stripe_account_id now
  if (!user.stripe_account_id) {
    const account = await stripe.accounts.create({
      type: "express",
    });

    console.log("ACCOUNT ====> ", account.id);

    /* now you can see account if in console, each time you make a request, this account id is created
       that's why we should save it in database so that if user started the process but did not complete
       we can continue using same account id, instead of creating new one
    */

    user.stripe_account_id = account.id;
    user.save(); //save it in database
  }

  //3) create account link based on account id(for frontend to complete onboarding)
  let accountLink = await stripe.accountLinks.create({
    account: user.stripe_account_id,
    refresh_url: process.env.STRIPE_REDIRECT_URL,
    return_url: process.env.STRIPE_REDIRECT_URL,
    type: "account_onboarding",
  });
  //prefill some info for customer such as email
  Object.assign(accountLink, {
    "stripe_user[email]": user.email || undefined,
  });

  console.log("ACCOUNT LINK ===> ", accountLink);
  /*
  ACCOUNT LINK ===>  {
  object: 'account_link',
  created: 1668025306,
  expires_at: 1668025606,
  url: 'https://connect.stripe.com/setup/e/acct_1M2KDlGfKwCyoZ5d/QhEcWIOOlqcw',
  'stripe_user[email]': 'AA@gmail.com' }
  */

  //send the link to the frontend:
  let link = `${accountLink.url}?${queryString.stringify(accountLink)}`;
  res.send(link);
};

//------------------------------------------------------------------------------

//update payment schedule(optional.default is 2 days)
const updateDelayDays = async (accountId) => {
  const account = await stripe.accounts.update(accountId, {
    settings: {
      payouts: {
        schedule: {
          delay_days: 7,
        },
      },
    },
  });
  return account;
};

/* ============================================================================================== */

export const getAccountStatus = async (req, res) => {
  //make request to stripe and get user status
  const user = await User.findById(req.user._id).exec();
  const account = await stripe.accounts.retrieve(user.stripe_account_id);
  //console.log("USER ACCOUNT Retrieve ====> ", account);

  //update delay days:
  const updatedAccount = await updateDelayDays(account.id);

  const updatedUser = await User.findByIdAndUpdate(
    user._id,
    {
      stripe_seller: updatedAccount,
    },
    { new: true } //this will make sure the updated document can return to the variable
  )
    .select("-password")
    .exec();

  res.json(updatedUser); //send updatedUser information back to front end

  /* updatedUser:
        _id:
        name:
        email:
        stripe_account_id:
        stripe_seller: {......, charges_enabled: true, ........}
  */
};

/* ============================================================================================== */

export const getAccountBalance = async (req, res) => {
  const user = await User.findById(req.user._id).exec();
  try {
    const balance = await stripe.balance.retrieve({
      stripeAccount: user.stripe_account_id,
    });
    res.json(balance);
  } catch (error) {
    console.log("getAccountBalance ERROR===> ", error);
  }
};

/* ============================================================================================== */

export const payoutSetting = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).exec();

    //backend then request stripe, to get this user's login Link
    const loginLink = await stripe.accounts.createLoginLink(
      user.stripe_account_id,
      {
        redirect_url: process.env.STRIPE_SETTING_REDIRECT_URL, //after user done with the setting in stripe, will be redirect here
      }
    );

    res.json(loginLink);
    //
  } catch (error) {
    console.log("payoutSetting ERROR ===> ", error);
  }
};

/* ============================================================================================== */

export const stripeSessionId = async (req, res) => {
  // 1) get hotelId from req.body
  const { hotelId } = req.body;
  // 2) find the hotel based on hotelId from database
  const item = await Hotel.findById(hotelId).populate("postedBy").exec();

  // 3) 20% charge as application fee
  const fee = (item.price * 20) / 100;

  // 4) create a session
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    // 5) purchashing item details, it will be shown to user on checkout
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: item.title,
          },
          unit_amount: item.price * 100,
        },
        quantity: 1,
      },
    ],
    // 6) create payment intent with application fee and destination charge 80%
    payment_intent_data: {
      application_fee_amount: fee * 100, //in cents
      transfer_data: {
        destination: item.postedBy.stripe_account_id,
      },
    },

    //after finish payment, the frontend will redirect to this page and we also want it to have the hotel id
    success_url: `${process.env.STRIPE_SUCCESS_URL}/${item._id}`,
    cancel_url: process.env.STRIPE_CANCEL_URL,
    mode: "payment",
  });

  // 7) add this session object to user in database
  await User.findByIdAndUpdate(req.user._id, { stripeSession: session }).exec();

  // 8) send the session id to the frontend
  res.send({
    sessionId: session.id,
  });
  // console.log("SESSION ===> ", session);
};

/* ============================================================================================== */

export const stripeSuccess = async (req, res) => {
  try {
    // 1) get hotel id from req.body
    const { hotelId } = req.body;
    // 2) find currently logged in user
    const user = await User.findById(req.user._id).exec();

    //check if user has stripeSession
    if (!user.stripeSession) return;

    // 3) retrieve stripe session, based on session id we previously save in user database
    const session = await stripe.checkout.sessions.retrieve(
      user.stripeSession.id
    );

    // 4) if session payment status is paid, create order
    if (session.payment_status === "paid") {
      // 5) check if order with that session id already exist by querying orders collection
      const orderExist = await Order.findOne({
        "session.id": session.id,
      }).exec();

      if (orderExist) {
        // 6) if order exist, send success true
        res.json({ success: true });
      } else {
        // 7) if order not exist, create a new order and send success true
        let newOrder = await new Order({
          hotel: hotelId,
          session: session,
          orderedBy: user._id,
        }).save();

        // 8) remove user's stripeSession in user document
        await User.findByIdAndUpdate(user._id, {
          $set: { stripeSession: {} },
        });

        // 9) send response
        res.json({ success: true });
      }
    }
  } catch (error) {
    console.log("Stripe Success Error", error);
  }
};
