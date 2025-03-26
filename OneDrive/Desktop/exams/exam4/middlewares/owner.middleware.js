const {authErrorHandler} = require("../utils/error.handler")
const Posts = require("../models/post.model")



let ownerChecker = authErrorHandler(async (req, res, next) => {
    let post = await Posts.findById(req.params.id).exec()
    if(!post) throw new Error("Bunday post yo'q")
    
    if (post.author != req.id) req.id = null
	next()
})


module.exports = {ownerChecker}