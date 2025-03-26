const User = require("../models/user.model");
const {errorHandler} = require("../utils/error.handler");
const responscha = require("../utils/response");

let getAllUsers = errorHandler(async (req, res, next) => {
  let users = await User.find();
  responscha(res, 200, users);
});

module.exports = {
  getAllUsers,
};
