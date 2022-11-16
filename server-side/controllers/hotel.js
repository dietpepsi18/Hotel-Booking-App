import Hotel from "../mongoDB_models/hotel.js";
import Order from "../mongoDB_models/order.js";
import fs from "fs";

export const create = async (req, res) => {
  //console.log("req.fields ===> ", req.fields); // {title:, content, location, price, from, to, bed}
  //console.log("req.files ===> ", req.files);   //{image: ....}

  try {
    let fields = req.fields;
    let files = req.files;

    let hotel = new Hotel(fields);
    hotel.postedBy = req.user._id;

    //handle image
    if (files.image) {
      hotel.image.data = fs.readFileSync(files.image.path); //save it to database
      hotel.image.contentType = files.image.type;
    }
    hotel.save((err, result) => {
      if (err) {
        console.log("saving hotel error ==> ", err);
        res.status(400).send("ERROR SAVING the HOTEL");
      }
      res.json(result); //send back to front end
    });
  } catch (error) {
    console.log("create function in hotel.js ERROR ==> ", error);
    res.status(400).json({ error: error.message });
  }
};

export const hotels = async (req, res) => {
  /* don't select image right now, because image load very slow, 
     we will show just content first, and the image will load slightly later 
     in database: image : {data: Buffer, contentType: String}
     but we still want to know the image's content type first, 
     so just remove image.data first*/

  let all = await Hotel.find({})
    .limit(24)
    .select("-image.data")
    .populate("postedBy", "_id name")
    .exec();
  /*in the database postedBy: {type: ObjectId, ref: "User"} by using populate(), we can connect two collections together
    So in postedBy, we are not just store _id, we store the user information
    populate() is for showing user's name and other information, not just id
    the second parameter "_id name" means we will only show _id and name 
  */
  res.json(all);
};

export const image = async (req, res) => {
  let hotel = await Hotel.findById(req.params.hotelId).exec();
  if (hotel && hotel.image && hotel.image.data !== null) {
    res.set("Content-Type", hotel.image.contentType);
    return res.send(hotel.image.data);
  }
};

export const sellerHotels = async (req, res) => {
  //because there is a middleware 'requireSignin', this middleware will return the req.user
  let all = await Hotel.find({ postedBy: req.user._id })
    .select("-image.data") // the image data will be query later
    .populate("postedBy", "_id name") //use User collection's _id, name to represent "postedBy"
    .exec();
  res.send(all);
};

export const remove = async (req, res) => {
  let removed = await Hotel.findByIdAndDelete(req.params.hotelId)
    .select("-image.data")
    .exec();
  res.json(removed);
};

export const read = async (req, res) => {
  let hotel = await Hotel.findById(req.params.hotelId)
    .populate("postedBy", "_id name")
    .select("-image.data")
    .exec();
  res.json(hotel);
};

export const update = async (req, res) => {
  try {
    let fields = req.fields;
    let files = req.files;

    let data = { ...fields };

    if (files.image) {
      let image = {};
      image.data = fs.readFileSync(files.image.path);
      image.contentType = files.image.type;

      data.image = image;
    }

    let updated = await Hotel.findByIdAndUpdate(req.params.hotelId, data, {
      new: true,
    }).select("-image.data");
    res.json(updated);
    //
  } catch (error) {
    res.status(400).send("Hotel update failed. Try again");
  }
};

export const userHotelBookings = async (req, res) => {
  const all = await Order.find({ orderedBy: req.user._id })
    .select("session")
    .populate("hotel", "-image.data")
    .populate("orderedBy", "_id name")
    .exec();

  res.json(all);
};

export const isAlreadyBooked = async (req, res) => {
  const { hotelId } = req.params;
  //find orders of the currently logged in user
  const userOrders = await Order.find({ orderedBy: req.user._id })
    .select("hotel")
    .exec();

  //check if hotel id is found in userOrders array
  let ids = [];
  for (let i = 0; i < userOrders.length; i++) {
    ids.push(userOrders[i].hotel.toString());
  }
  res.json({ ok: ids.includes(hotelId) });
};

export const searchListings = async (req, res) => {
  const { location, date, bed } = req.body;
  const fromDate = date.split(",");
  let result = await Hotel.find({
    from: { $gte: new Date(fromDate[0]) },
    location,
    bed: { $gte: bed - 1 },
  })
    .select("-image.data")
    .exec();

  res.json(result);
};
