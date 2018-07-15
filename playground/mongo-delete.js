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

    // dbo.collection("Todos").deleteMany({
    //         text: "Eat lunch"
    //     })
    //     .then((res) => {
    //         console.log(res);

    //     })

    // dbo.collection("Todos").deleteOne({text : "Watch the final"})
    //     .then(res => console.log(res));

    dbo.collection("Todos").findOneAndDelete({completed : false})
        .then(
            (doc) => {
                console.log(doc)
            }
        )

    // client.close();

});