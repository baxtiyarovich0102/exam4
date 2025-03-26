const env = require("dotenv").config();
const express = require("express");
let app = express();
let cookieParser = require("cookie-parser");

const authRouter = require("./routes/auth.route.js");
const userRouter = require("./routes/user.route.js");
const postRouter = require("./routes/post.route.js")

const errController = require("./controllers/error.controller.js");
const connectDb = require("./config/db.js");


connectDb()
app.use(express.json());
app.use(express.urlencoded({extended: false}))
app.use("/uploads", express.static( "./uploads"))
app.use(cookieParser());
app.use(errController)

app.use("/auth", authRouter)
app.use("/users", userRouter)
app.use("/", postRouter)



app.listen(process.env.PORT, () =>
  console.log("This server is running on " , process.env.PORT)
);
