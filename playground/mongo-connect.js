// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

const uri = "mongodb://shubham:123thedude@ds018848.mlab.com:18848/todoapp2"
MongoClient.connect(uri, { useNewUrlParser: true }, (err, client) => {
    if (err) {
        return console.log("Unable to connect", err)
    }

    console.log("Connected to mongodb server mlab");

    const dbo = client.db("todoapp2");
    // const myobj = { text: "some todo", completed: true };

    // dbo.collection("Todos").insertOne(myobj, function(err, res) {
    //   if (err) throw err;
    //   console.log(res.ops);
    //   client.close();
    // });

    // dbo.collection("Users").insertOne({
    //     name : "Shubham",
    //     age : 20,
    //     location : "Picnic Garden, Kolkata"
    // }, (err, res) => {
    //     if (err) {
    //         return console.log(err);
    //     } 

    //     console.log(res.ops);
    // })

    client.close();

});