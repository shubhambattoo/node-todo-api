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
app.post("/todos", (req, res) => {
	// console.log(req.body);

	var todo = new Todo({
		text: req.body.text
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
app.get("/todos", (req, res) => {

	Todo.find()
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
app.get("/todos/:id", (req, res) => {
	const id = req.params.id;

	if(!ObjectId.isValid(id)) {
		return res.status(404).send();
	}

	Todo.findById(id)
		.then((todo) => {

			if(!todo) {
				return res.status(404).send();
			}

			res.send({todo})
		})
		.catch(e => res.status(400).send())

})


// delete todo
app.delete("/todos/:id", (req, res) => {

	const id = req.params.id;

	if(!ObjectId.isValid(id)) {
		return res.status(404).send();
	}

	Todo.findByIdAndRemove(id)	
		.then((todo) => {
			if(!todo) {
				return res.status(404).send();
			}

			res.send({todo})
		})
		.catch(e => res.status(400).send())
})

// update todos
app.patch("/todos/:id", (req, res) => {
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

	Todo.findByIdAndUpdate(id, {$set : body}, {new : true})
		.then((todo) => {
			
			if(!todo) {
				return res.status(404).send();
			}

			res.send({todo})
		})
		.catch(e => res.status(400).send())

})


// post user
app.post("/users", (req, res) => {

	const body = _.pick(req.body, ['email','password']);

	const user = new User(body)

	user.save()
		.then((user) => {
			return user.generateAuthToken();
		}).then((token) => {
			res.header('x-auth' , token).send(user)
		})
		.catch(err => res.status(400).send(err));

})

app.get("/users/me", authorization , (req, res) => {
	res.send(req.user)
})


app.listen(port);
console.log("The app was started on " + port);

module.exports = {
	app
}