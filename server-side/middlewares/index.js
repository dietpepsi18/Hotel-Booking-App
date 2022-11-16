import expressJwt from "express-jwt";
import Hotel from "../mongoDB_models/hotel";

//this middleware is to make sure the client has a valid token before requesting to route
//this function will return the req.user
export const requireSignin = expressJwt({
  //check secret, check expiration
  secret: process.env.JWT_SECRET,
  algorithms: ["HS256"],
});

//this middleware is to make sure the client who delete the hotel is also the one who post it
//any middleware need to have the callback function 'next'
export const hotelOwner = async (req, res, next) => {
  let hotel = await Hotel.findById(req.params.hotelId).exec();
  let isOwner = hotel.postedBy._id.toString() === req.user._id.toString();

  if (!isOwner) {
    return res.status(403).send("Unauthorized");
  }
  next();
};
