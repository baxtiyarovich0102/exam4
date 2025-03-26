const env = require("dotenv").config();
const express = require("express");
let app = express();
let cookieParser = require("cookie-parser");



const errController = require("./controllers/error.controller.js");
const connectDb = require("./config/db.js");

app.use(express.json());
app.use(cookieParser());
app.use(errController)
connectDb()



app.listen(process.env.PORT, () =>
  console.log("This server is running on " , process.env.PORT)
);
