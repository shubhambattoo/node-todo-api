require('./config/config');

const express = require("express");
const bodyParser = require("body-parser");

const {ObjectId} = require('mongodb')
const {mongoose} = require("./db/mongoose");
const _ = require("lodash");

// models
const {User} = require("./models/users");
const {authorization} = require("./middleware/authenticate")
const {Todo} = require("./models/todos");

const app = express();

const port = process.env.PORT;

app.use(bodyParser.json());

// post a todo
app.post("/todos", authorization, (req, res) => {
	// console.log(req.body);

	var todo = new Todo({
		text: req.body.text,
		_creator : req.user._id
	});

	todo.save().then(
		doc => {
			res.send(doc);
		},
		e => {
			res.status(400).send(e);
		}
	);
});

// get all todos
app.get("/todos",authorization , (req, res) => {

	Todo.find({_creator : req.user._id})
		.then((todos) => {
			res.send({
				todos,
				code : 200
			})
		})
		.catch((e) => {
			res.status(400).send(e)
		})

})

// get single todo by id
app.get("/todos/:id", authorization, (req, res) => {
	const id = req.params.id;

	if(!ObjectId.isValid(id)) {
		return res.status(404).send();
	}

	Todo.findOne({
		_id : id,
		_creator : req.user._id
	})
		.then((todo) => {

			if(!todo) {
				return res.status(404).send();
			}

			res.send({todo})
		})
		.catch(e => res.status(400).send())

})


// delete todo
app.delete("/todos/:id", authorization, async (req, res) => {

	const id = req.params.id;

	if(!ObjectId.isValid(id)) {
		return res.status(404).send();
	}
	
	try {
		const todo = await 	Todo.findOneAndRemove({
			_id : id,
			_creator : req.user._id
		})	
	
		if(!todo) {
			return res.status(404).send();
		}
	
		res.send({todo})
	} catch (error) {
		res.status(400).send()
	}


	// Todo.findOneAndRemove({
	// 	_id : id,
	// 	_creator : req.user._id
	// })	
	// 	.then((todo) => {
	// 		if(!todo) {
	// 			return res.status(404).send();
	// 		}

	// 		res.send({todo})
	// 	})
	// 	.catch(e => res.status(400).send())
})

// update todos
app.patch("/todos/:id", authorization, (req, res) => {
	const id = req.params.id;
	const body = _.pick(req.body, ["text", "completed"]);

	if(!ObjectId.isValid(id)) {
		return res.status(404).send();
	}

	if(_.isBoolean(body.completed) && body.completed) {
		body.completedAt = new Date().getTime();
	} else {
		body.completed = false;
		body.completedAt = null;
	}

	Todo.findOneAndUpdate({_id : id, _creator : req.user._id}, {$set : body}, {new : true})
		.then((todo) => {
			
			if(!todo) {
				return res.status(404).send();
			}

			res.send({todo})
		})
		.catch(e => res.status(400).send())

})


// post user
app.post("/users", async (req, res) => {

	try {
		const body = _.pick(req.body, ['email','password']);
		const user = new User(body);

		await user.save();
		const token = await user.generateAuthToken();
		res.header('x-auth' , token).send(user);
	} catch (error) {
		res.status(400).send(err)
	}


	// 	const body = _.pick(req.body, ['email','password']);
	// 	const user = new User(body);
	// user.save()
	// 	.then((user) => {
	// 		return user.generateAuthToken();
	// 	}).then((token) => {
	// 		res.header('x-auth' , token).send(user)
	// 	})
	// 	.catch(err => res.status(400).send(err));

})

app.get("/users/me", authorization , (req, res) => {
	res.send(req.user)
})

app.post("/users/login", async (req, res) => {

	try {
		const body = _.pick(req.body, ['email', 'password']);
		const user = await User.findByCredentials(body.email, body.password);
		const token = await user.generateAuthToken();
		res.header('x-auth', token).send(user)
	} catch (error) {
		res.status(400).send()
	}

	// User.findByCredentials(body.email, body.password)
	// 	.then((user) => {
	// 		// console.log(user)
	// 		// res.send(user)
	// 		user.generateAuthToken()
	// 			.then((token) => {
	// 				res.header('x-auth', token).send(user)
	// 			})
	// 	})
	// 	.catch((err) => {
	// 		res.status(400).send()
	// 	})

})

app.delete("/users/me/token", authorization, async (req, res) => {

	try {
		await req.user.removeToken(req.token)
		res.status(200).send()
	} catch (e) {
		res.status(400).send()
	}

	// req.user.removeToken(req.token)
	// 	.then(() => res.status(200).send(), () => res.status(400).send())

})


app.listen(port);
console.log("The app was started on " + port);

module.exports = {
	app
}