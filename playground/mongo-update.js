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

    dbo.collection("Todos").findOneAndUpdate({
            _id: new ObjectID('5b4ae6dd31b3ecbc8c19b498')
        }, {
            $set: {
                completed  : true
            }
        }, {
            returnOriginal : false
        })
        .then(
            (doc) => {
                console.log(doc)
            }
        )

    // client.close();

});