import mongoose from "mongoose";

const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema; //An ObjectId is a special type typically used for unique identifiers

const hotelSchema = new Schema(
  {
    title: {
      type: String,
      trim: true,
      required: "Title is required",
    },
    content: {
      type: String,
      trim: true,
      required: "Content is required",
      maxlength: 10000,
    },
    location: {
      type: String,
      trim: true,
      required: "Location is required",
    },
    price: {
      type: Number,
      trim: true,
      required: "Price is required",
    },
    postedBy: {
      type: ObjectId,
      ref: "User",
    },
    image: {
      data: Buffer,
      contentType: String,
    },
    from: {
      type: Date,
    },
    to: {
      type: Date,
    },
    bed: {
      type: Number,
    },
  },
  { timestamps: true } // it will automatically add two fields in the databse, one is created date, the other is updated date
);

//const hotelModel = mongoose.model("Hotel", hotelSchema); //collection name will be 'Hotels'
export default mongoose.model("Hotel", hotelSchema);
