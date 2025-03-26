const Posts = require("../models/post.model")
const {errorHandler} = require("../utils/error.handler");
const responscha = require("../utils/response");


let getAllPosts = errorHandler(async (req, res, next) => {
	let posts = await Posts.find().populate('author')

	responscha(res, 200, { posts })
})


let getPostById = errorHandler(async (req, res, next) => {
	let post = await Posts.findById(req.params.id).populate('author').exec()

	if (!post) throw new Error("Bunday post yo'q")
	responscha(res, 200, { post })
})


let postPost = errorHandler(async (req, res, next) => {
 
    
	let body = req.body.body ? JSON.parse(req.body.body) : req.body

	if (!body.title || !body.text)
		throw new Error("Ma'lumot to'liq emas")

	if (req.file) body.image = '/uploads/posts/' + req.file.filename
	body.author = req.id

	let data = await Posts.create(body)

	responscha(res, 201, { message: 'Post yuklandi', data })
})


let updatePost = errorHandler(async (req, res, next) => {

    if(req.id == null) throw new Error("Siz bu postni o'zgartira olmaysiz")
	let body = req.body
	let post = await Posts.findById(req.params.id)

	post.title = body.title ? body.title : post.title;
    post.text = body.text ? body.text : post.text;

	await post.save()
	responscha(res, 203, { message: "Muvaffaqiyatli o'zgartirildi", post })
})



let deletePost = errorHandler(async (req, res, next) => {
    if(req.id == null) throw new Error("Siz bu postni o'chira olmaysiz")

    await Posts.findByIdAndDelete(req.params.id)
    responscha(res, 200, {message: "Muvaffaqiyatli o'chirildi"})

})


module.exports = {getAllPosts, getPostById, updatePost, deletePost, postPost}