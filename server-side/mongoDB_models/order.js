import mongoose from "mongoose";

const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema; //An ObjectId is a special type typically used for unique identifiers

const orderSchema = new Schema(
  {
    hotel: {
      type: ObjectId,
      ref: "Hotel",
    },
    session: {},
    orderedBy: {
      type: ObjectId,
      ref: "User",
    },
  },
  { timestamps: true } // it will automatically add two fields in the databse, one is created date, the other is updated date
);

//const orderModel = mongoose.model("Order", orderSchema); //collection name will be 'Orders'
export default mongoose.model("Order", orderSchema);
