const express = require("express");
const app = express();
const port =8080;
const mongoose = require('mongoose');
const path = require("path");
const ejsMate = require("ejs-mate");
const User = require("./models/users.js");
const methodOverride = require("method-override");
let currentUser = "Guest";
app.set("views", path.join(__dirname,"views"));
app.set("view engine","ejs");
app.use(express.json());
app.use(express.urlencoded({extended : true}))
app.use(express.static(path.join(__dirname,"public")));
app.use(methodOverride("_method"));
main()
.then(() =>{
    console.log("connection successful");
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/netflix');
}

// ROOT PAGE
app.get("/netflix/root", async(req,res) =>{
    let data = await User.find();
    res.render("root.ejs",{data});
})

app.get("/netflix", (req,res) =>{
    // res.send("root is working");
    res.render("login.ejs");
})
// HOME PAGE
app.get("/netflix/home", (req,res) =>{
    res.render("index.ejs",{currentUser});
})
// POST REQUEST
app.post("/netflix", async(req,res) =>{
    let data = await User.find();
    console.log(data);
    let {username, password} = req.body;
    let reqdata = data.find((p) => p.username == username);
    if (reqdata.password == password){
        currentUser = username;
        if(username == "root"){
            res.redirect("/netflix/root");
        }
        else{
            res.redirect("/netflix/home");
        }
    }
    else{
        res.send("Wrong Password");
    }
    console.log(pass); 
})
// SIGNUP
app.post("/netflix/profile",(req,res) =>{
    let {username, password} = req.body;

    let newuser= new User({
    username : username,
    password : password
    });

    newuser.save()
    .then((res) =>{
        console.log(res);
    })
    .catch((err) =>{
        console.log(err);
    })
    res.redirect("/netflix");
    })
    
// PROFILE PAGE

app.get("/netflix/profile", (req,res) =>{
    res.render("profile-details.ejs",{currentUser});
})
// SIGNUP PAGE
app.get("/netflix/signup", (req,res) =>{
    res.render("signup.ejs");
})
app.listen(port, () =>{
    console.log(`server is listening on port ${port}`)
});

