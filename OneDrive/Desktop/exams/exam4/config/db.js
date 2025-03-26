const mongoose = require("mongoose");
const connectDb = async () => {
  try {
    await mongoose
      .connect(process.env.DATABASE)
      .then((log) => {
        console.log("Connected to MongoDB");
      });
  } catch (error) {
    console.log("Db connection failed");
  }
};
module.exports = connectDb;
