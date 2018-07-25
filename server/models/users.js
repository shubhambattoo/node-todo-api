const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require("jsonwebtoken");
const _ = require("lodash");

const Schema = mongoose.Schema;

const userSchema = new Schema({
	email: {
		type: String,
		required: true,
		minlength: 1,
		trim: true,
		unique: true,
		validate: {
			validator: validator.isEmail,
			message: "{VALUE} is not a valid email address"
		}
	},
	password: {
		type: String,
		required: true,
		minlength: 6
	},
	tokens: [{
		access: {
			type: String,
			required: true
		},
		token: {
			type: String,
			required: true
		}
	}]
})

userSchema.methods.toJSON = function () {
	const user = this;

	const userObj = user.toObject()

	return _.pick(userObj, ['_id', 'email'])

}

userSchema.methods.generateAuthToken = function () {
	const user = this;
	const access = 'auth';
	const token = jwt.sign({_id : user._id.toHexString(), access }, 'manchesterUnited').toString();

	user.tokens.push({access, token});

	return user.save()
		.then(() => token)
		
}

const User = mongoose.model('User', userSchema);

module.exports = {
	User
}