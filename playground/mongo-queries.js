const {ObjectId}  = require("mongodb");

const { mongoose } = require("./../server/db/mongoose");
const { Todo } = require("../server/models/todos");

// ObjectId("5b52dc2e6b03f6023d3ab846")
const id = '5b52dc2e6b03f6023d3ab846';

if (!ObjectId.isValid(id)) {
   console.log("Not a valid id");   
}


// Todo.find({
//     _id : id
// })
// .then((todos) => {
//     console.log("Todos", todos)
// })

// Todo.findOne({
//     _id : id
// })
// .then((todo) => {
//     console.log("Todo", todo)
// })

Todo.findById(id)
    .then((todo) => {
        if(!todo) {
           return console.log("ID not found");
        }
        console.log("Todo", todo)
    })
    .catch(e => console.log(e))