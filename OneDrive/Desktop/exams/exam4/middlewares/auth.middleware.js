const {authErrorHandler} = require("../utils/error.handler")
const jwt = require("jsonwebtoken")



let Protector = authErrorHandler(async (req, res, next) => {
    
	let token = req.headers.authorization

	if (!token) throw new Error('Log In or Register Please!')
	if (!token.startsWith('Bearer'))
		throw new Error('Please enter valid token!')
	token = token.split(' ')[1]
    let verified = jwt.verify(token, process.env.JWT_TOKEN_SECRET_KEY)
    req.id = verified.id

	next()
})

module.exports = {Protector}