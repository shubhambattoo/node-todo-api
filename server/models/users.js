const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const _ = require("lodash");
const bcrypt = require('bcryptjs');

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
});

userSchema.methods.toJSON = function () {
	const user = this;

	const userObj = user.toObject();

	return _.pick(userObj, ["_id", "email"]);
};

userSchema.methods.generateAuthToken = function () {
	const user = this;
	const access = "auth";
	const token = jwt
		.sign({
			_id: user._id.toHexString(),
			access
		}, "manchesterUnited")
		.toString();

	user.tokens.push({
		access,
		token
	});

	return user.save().then(() => token);
};

userSchema.methods.removeToken = function (token) {

	var user = this;

	return user.update({
		$pull : {
			tokens : {token}
		}
	})

}

userSchema.statics.findByToken = function (token) {
	var User = this;
	var decoded;

	try {
		decoded = jwt.verify(token, "manchesterUnited");
	} catch (e) {
		return Promise.reject();
	}

	return User.findOne({
		_id: decoded._id,
		"tokens.token": token,
		"tokens.access": "auth"
	});
};

userSchema.statics.findByCredentials = function (email, password) {

	var User = this;
	// console.log("email sent mid ", email)
	return User.findOne({email})
		.then((user) => {
			// console.log(user)
			if(!user) {
				return Promise.reject();
			}

			return new Promise ((resolve, reject) => {

				bcrypt.compare(password, user.password)
					.then((res) => {
						resolve(user)
					})
					.catch((err) => reject())

			})

		})
}

userSchema.pre('save', function (next) {

	const user = this;
	if (user.isModified('password')) {

		bcrypt.genSalt(10, (err, salt) => {
			bcrypt.hash(user.password, salt, (err, hash) => {
				user.password = hash;
				next()
			})
				
		})

	} else {
		next()
	}

})

const User = mongoose.model("User", userSchema);

module.exports = {
	User
};