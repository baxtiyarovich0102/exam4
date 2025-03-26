let express = require("express");
let router = express.Router();
const multer = require("multer")
const postController = require("../controllers/post.controller")
const {Protector} = require("../middlewares/auth.middleware")
const {ownerChecker} = require("../middlewares/owner.middleware")
let path = require("path")



const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(process.cwd(), 'uploads', 'posts'))
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
        if (!file) return cb(new Error("File mavjud emas"))
        if (ext !== '.jpg' && ext !== '.png' && ext !== '.jpeg' && ext !== ".JPG")
            return cb(new Error("Bunday tur yo'q"))
        cb(null, true);
    }

})


router.route("/posts").get(postController.getAllPosts)
router.route("/posts/:id").get(postController.getPostById)
router.route("/posts").post(Protector,  upload.single('file'), postController.postPost)
router.route("/posts/:id").put(Protector, ownerChecker, postController.updatePost)
router.route("/posts/:id").delete(Protector, ownerChecker, postController.deletePost)

module.exports = router