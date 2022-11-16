import mongoose from "mongoose";
import bcrypt from "bcrypt";

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: "Name is required",
    },
    email: {
      type: String,
      trim: true,
      required: "Email is required",
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 2,
    },
    stripe_account_id: "",
    stripe_seller: {},
    stripeSession: {},
  },
  { timestamps: true } // it will automatically add two fields in the databse, one is created date, the other is updated date
);

/*use “pre” middleware in schema to make sure the password is hashed
  Hashing should be done only in 2 situations:
    1)if it is the first time a user is being created
    2)User has updated the existing password
*/

userSchema.pre("save", function (next) {
  let user = this;
  if (user.isModified("password")) {
    return bcrypt.hash(user.password, 12, function (err, hash) {
      //the second is for how strong you want the hashing to be
      if (err) {
        console.log("Bcrypt has ERROR: ", err);
        return next(err);
      } else {
        user.password = hash;
        return next();
      }
    });
  } else {
    return next();
  }
});

//define a method for all the instance objects of userSchema
userSchema.methods.comparePassword = function (password, next) {
  bcrypt.compare(password, this.password, function (err, match) {
    //this = document
    if (err) {
      console.log("Compare Password ERR: ", err);
      return next(err, false);
    } else {
      console.log("Password matched: ", match);
      return next(null, match); //true
    }
  });
};

//const userModel = mongoose.model("User", userSchema); //collection name will be 'Users'
export default mongoose.model("User", userSchema);
