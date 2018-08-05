const {SHA256} = require('crypto-js');
const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs');

const password = "123abc!"

bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, (err, hash) => {
        // console.log(hash);
    })
})

const hashedPw = '$2a$10$5gjq0A5WPa4SA.a9UhzF8uYynAhnRbdeCPzpETPbIMni5s70oX4Wa';

bcrypt.compare(password, hashedPw)
    .then((res) => console.log("matched", res))
    .catch((err) => console.log("Error occured" , err))

// const data = {
//     id : 10
// }

// const token = jwt.sign(data, "manchesterUnited")
// console.log(token);

// const decoded = jwt.verify(token, "manchesterUnited")
// console.log('decoded', decoded)

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