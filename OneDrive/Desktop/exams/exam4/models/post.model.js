const mongoose = require("mongoose");


const PostSchema = new mongoose.Schema(
    {
        title: {type: String, required: true},
        author: {type: mongoose.Schema.Types.ObjectId, ref: "users"},
        text: {type: String, required: true},
        image: {type: String}
    }
)

let Post = mongoose.model("posts", PostSchema)

module.exports = Post