import User from "../mongoDB_models/user.js"; //User is userModel
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  //after got user data in req.body, now it's time to save it to database
  const { name, email, password } = req.body;

  /* First determine whether the data is complete */

  try {
    //1) if the name is empty
    if (!name) {
      return res.status(400).send("Name is required");
    }

    //2) if the password is empty
    if (!password || password.length < 2) {
      return res
        .status(400)
        .send("Password is required and should be minimum 2 characters long");
    }

    //3) if the user has existed
    let userExist = await User.findOne({ email }).exec();
    if (userExist) return res.status(400).send("Email is taken");

    /* After make sure the data is completed, now create the document in the database*/

    const user = new User(req.body);

    await user.save();
    return res.json({ ok: true });
  } catch (err) {
    console.log("CREATE USER FAILED", err);
    return res.status(400).send("Error. Try again.");
  }
};

/////////////////////////////////////////////////////////////////////////////////////
export const login = async (req, res) => {
  //console.log(req.body); //{ email: 'AA@gmail.com', password: '123' }
  const { email, password } = req.body;

  try {
    //check if user with that email exist
    let user = await User.findOne({ email }).exec(); //if the user exist, it will return the document

    //1) if the user doesn't exist:
    if (!user) {
      return res.status(400).send("User with that email not found");
    }

    //2) compare the password:
    user.comparePassword(password, (err, match) => {
      if (!match || err) {
        return res.status(400).send("Wrong password");
      }

      // now the password is matched, generate a signed token: JWT
      let token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });

      //send the token back to the client side
      res.json({
        token: token,
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
          stripe_account_id: user.stripe_account_id,
          stripe_seller: user.stripe_seller,
          stripeSession: user.stripeSession,
        },
      });
    });
  } catch (error) {
    res.status(400).send("Log in failed");
  }
};
