// const MongoClient = require('mongodb').MongoClient;
const {
    MongoClient,
    ObjectID
} = require('mongodb');

const uri = "mongodb://shubham:123thedude@ds018848.mlab.com:18848/todoapp2"
MongoClient.connect(uri, {
    useNewUrlParser: true
}, (err, client) => {
    if (err) {
        return console.log("Unable to connect", err)
    }

    console.log("Connected to mongodb server mlab");

    const dbo = client.db("todoapp2");

    dbo.collection('Todos').find({completed : false}).toArray()
        .then((doc) => {
            console.log("Todos");
            console.log(JSON.stringify(doc, undefined, 2));
        }, (err) => {
            console.log("Unable to fetch", err);
        })

    // client.close();

});