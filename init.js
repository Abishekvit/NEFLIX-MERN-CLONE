const mongoose = require('mongoose');
const User = require("./models/users.js");

main()
.then(() =>{
    console.log("connection successful");
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/netflix');
}

let user1= new User({
    username : "root",
    password : "rootuser"
});

user1.save()
.then((res) =>{
    console.log(res);
})
.catch((err) =>{
    console.log(err);
})