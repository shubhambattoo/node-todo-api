const express = require("express");
const bodyParser = require("body-parser");

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

app.use(bodyParser.json());

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

app.listen(3000);
console.log("The app was started on 3000");

module.exports = {
	app
}