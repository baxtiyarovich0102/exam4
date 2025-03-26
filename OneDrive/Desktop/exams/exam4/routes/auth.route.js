let express = require("express");
let router = express.Router();
let authController = require("../controllers/auth.controller");
let multer = require("multer")
let path = require("path")



const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(process.cwd(), 'uploads', 'users'))
    },

	filename: function (req, file, cb) {
		cb(
			null,
			file.fieldname + '-' + Date.now() + path.extname(file.originalname),
		)
	},
})

const upload = multer({
	storage: storage,
	fileFilter: function (req, file, cb) {
		const ext = path.extname(file.originalname)
		if (!file) return cb(new Error('File mavjud emas'))
		if (ext !== '.jpg' && ext !== '.png' && ext !== '.jpeg' && ext !== ".JPG")
			return cb(new Error("Bunday tur yo'q"))
        cb(null, true);
	}
})


router.route("/register").post( upload.single('file'),authController.registerUser);
router.route("/login").post(authController.loginUser);
router.route("/refresh").post(authController.resetAccessTokenWithRefresh);
router.route("/logout").post(authController.logoutUser);



module.exports = router