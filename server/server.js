const express = require("express");
const bodyParser = require("body-parser");

const {ObjectId} = require('mongodb')
const {
	mongoose
} = require("./db/mongoose");

// models
const {
	User
} = require("./models/users");
const {
	Todo
} = require("./models/todos");

const app = express();

const port = process.env.PORT || 3000;

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

app.listen(port);
console.log("The app was started on " + port);

module.exports = {
	app
}