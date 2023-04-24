const path = require('path');
const fs = require('fs');

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require("body-parser");

const User = require("./model/userDetails.js");
const Stat = require("./model/statDetails.js");

const gameController = require("./controller/gameController.js")
const userController = require("./controller/userController.js")

const app = express();
const server = require("http").createServer(app);

const connectionString = "mongodb+srv://amalsn:amal123@ffsd42.qhbl5.mongodb.net/Proj42?retryWrites=true&w=majority";

mongoose.connect(connectionString, {useNewUrlParser: true, useUnifiedTopology: true}).catch(
    error => console.log(error)
);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

app.get("/tic-tac-toe",gameController.ticFunc)

app.get("/snake-ladder",gameController.snakeFunc)

app.get("/ludo",gameController.ludoFunc)

app.get("/users",userController.getUser)

app.post("/create-user",userController.createUser)

app.put("/update-user",userController.updateUser)

app.delete("/delete-user",userController.deleteUser)

server.listen(5000, () => {
    console.log("Radsfas unning....")
})

module.exports = server
