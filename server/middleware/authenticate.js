const {User} = require("./../models/users");
// const mongoose = require("mongoose");

var authorization  = (req, res, next) => {

	const token = req.header("x-auth");
	// console.log("token ",token)
	User.findByToken(token)
		.then((user) => {
			// console.log("user", user)
			if(!user) {
				return Promise.reject()
			}
			req.user = user;
			req.token = token;
			next()
		})
		.catch((err) => res.status(401).send())	

}

module.exports = {
    authorization
}