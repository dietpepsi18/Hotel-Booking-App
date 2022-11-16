//routes for hotels updating and creating

import express from "express";
import formidable from "express-formidable";
import {
  create,
  hotels,
  image,
  sellerHotels,
  remove,
  read,
  update,
  userHotelBookings,
  isAlreadyBooked,
  searchListings,
} from "../controllers/hotel";
import { requireSignin, hotelOwner } from "../middlewares"; //to make sure this is a logged in user

const router = express.Router();

router.post("/create-hotel", requireSignin, formidable(), create); //use formidable as middleware so that server can accept form data
router.get("/hotels", hotels); //for showing all the hotels
router.get("/hotel/image/:hotelId", image); // for showing hotel image
router.get("/seller-hotels", requireSignin, sellerHotels);
router.delete("/delete-hotel/:hotelId", requireSignin, hotelOwner, remove);
router.get("/hotel/:hotelId", read);
router.put(
  "/update-hotel/:hotelId",
  requireSignin,
  hotelOwner,
  formidable(),
  update
);
router.get("/user-hotel-bookings", requireSignin, userHotelBookings);
router.get("/is-already-booked/:hotelId", requireSignin, isAlreadyBooked);
router.post("/search-listings", searchListings);

module.exports = router;
