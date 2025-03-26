let express = require("express");
let router = express.Router();
let userController = require("../controllers/user.controller");
const Protector = require("../middlewares/auth.middleware");


router
  .route("/me")
  .get(Protector, userController.getAllUsers);
module.exports = router;