const {SHA256} = require('crypto-js');
const jwt = require("jsonwebtoken");

const data = {
    id : 10
}

const token = jwt.sign(data, "manchesterUnited")
console.log(token);

const decoded = jwt.verify(token, "manchesterUnited")
console.log('decoded', decoded)

// const message = "I am number 4";

// const hash = SHA256(message).toString();

// console.log("message", message);
// console.log("hash", hash);

// const data = {
//     id : 4
// }

// const token = {
//     data,
//     hash : SHA256(JSON.stringify(data) + 'manchesterUnited').toString()
// }

// // token.data.id = 5
// // token.hash = SHA256(JSON.stringify(token.data)).toString();

// const resultHash = SHA256(JSON.stringify(token.data) + 'manchesterUnited').toString()

// if (resultHash === token.hash) {
//     console.log("Trust this")
// } else {
//     console.log("DO not trust it");   
// }