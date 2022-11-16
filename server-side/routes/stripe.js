//routes for connecting stripe

import express from "express";
import {
  createConnectedAccount,
  getAccountStatus,
  getAccountBalance,
  payoutSetting,
  stripeSessionId,
  stripeSuccess,
} from "../controllers/stripe";
import { requireSignin } from "../middlewares";

const router = express.Router();

router.post("/create-connect-account", requireSignin, createConnectedAccount); //requireSignin is middleware
//when send request to this route, need to go through the middleware 'requireSignin' for checking if user has token
//after pass the middleware 'requireSignin', will call 'createConnectedAccount'

router.post("/get-account-status", requireSignin, getAccountStatus);
router.post("/get-account-balance", requireSignin, getAccountBalance);
router.post("/payout-setting", requireSignin, payoutSetting);
router.post("/stripe-session-id", requireSignin, stripeSessionId);

//for creating order:
router.post("/stripe-success", requireSignin, stripeSuccess);

module.exports = router;
