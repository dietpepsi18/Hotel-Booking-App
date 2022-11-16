//the entry file of the server

import express from "express";
import { readdirSync } from "fs";
import mongoose from "mongoose";
import cors from "cors"; //Cross-origin Resource Sharing

const morgan = require("morgan");
require("dotenv").config();

const app = express(); //create the server object

//connect to Mongo Atlas
mongoose
  .connect(process.env.DATABASE, { useUnifiedTopology: true })
  .then(() => console.log("Database connected"))
  .catch((err) => console.log("Database connection error: ", err));

//middlewares:
app.use(cors()); //allows devices on one domain to access resources residing on other domains
app.use(morgan("dev")); //it is helpful in development, when someone send a request to this server, the morgan will help make an alert
app.use(express.json()); //make sure the server side accept JSON data

//read all the files from folder 'routes', and apply them as middleware, so we don't need to manually import files
readdirSync("./routes").map((r) => {
  return app.use("/api", require(`./routes/${r}`));
});
// app.use("/api", router);  //route middleware

const port = process.env.PORT || 5050; //import from .env file
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
