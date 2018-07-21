const mongoose = require('mongoose')

const uri = "mongodb://shubham:123thedude@ds018848.mlab.com:18848/todoapp2";

mongoose.Promise = Promise;

mongoose.connect(process.env.MONGODB_URI || uri, {
	useNewUrlParser: true
});

module.exports = {mongoose};