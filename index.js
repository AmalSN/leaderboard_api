const path = require('path');
const fs = require('fs');

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require("body-parser");

const User = require("./model/userDetails.js");
const Stat = require("./model/statDetails.js");

const app = express();
const server = require("http").createServer(app);

const connectionString = "mongodb+srv://amalsn:amal123@ffsd42.qhbl5.mongodb.net/Proj42?retryWrites=true&w=majority";

mongoose.connect(connectionString, {useNewUrlParser: true, useUnifiedTopology: true}).catch(
    error => console.log(error)
);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

app.get("/tic-tac-toe",async (req, res) => {
    console.log(mongoose.connection.readyState)
    let x = await Stat.find({},"uName wins").limit(6);
    x = x.map(l => {
        return {_id: l._id, uName: l.uName, wins: l.wins[0], pic: `/profilePic/${l.uName}.png`}
    })
    x.sort(function(a,b){
        if (a.wins > b.wins) {
            return -1;
        }
        if (a.wins < b.wins) {
            return 1;
        }
        return 0;
    })
    console.log(x)
    // res.header({"Allow-Control-Allow-Origin":"*","Content-Type":"application/json"})
    res.json(x)
})

app.get("/snake-ladder",async (req, res) => {
    console.log(mongoose.connection.readyState)
    let x = await Stat.find({},"uName wins").limit(6);
    x = x.map(l => {
        return {_id: l._id, uName: l.uName, wins: l.wins[1], pic: `/profilePic/${l.uName}.png`}
    })
    x.sort(function(a,b){
        if (a.wins > b.wins) {
            return -1;
        }
        if (a.wins < b.wins) {
            return 1;
        }
        return 0;
    })
    console.log(x)
    res.json(x)
})

app.get("/ludo",async (req, res) => {
    console.log(mongoose.connection.readyState)
    let x = await Stat.find({},"uName wins").limit(6);
    x = x.map(l => {
        return {_id: l._id, uName: l.uName, wins: l.wins[2], pic: `/profilePic/${l.uName}.png`}
    })
    x.sort(function(a,b){
        if (a.wins > b.wins) {
            return -1;
        }
        if (a.wins < b.wins) {
            return 1;
        }
        return 0;
    })
    console.log(x)
    res.json(x)
})

app.get("/users",async (req, res) => {
    console.log(mongoose.connection.readyState)
    let x = await Stat.find({});
    res.json(x)
})

app.post("/delete-user",async(req, res) => {
    await User.deleteOne({uName: req.body.uName})
    await Stat.deleteOne({uName: req.body.uName})
    console.log(req.body.uName)
    res.sendStatus(200)
})

server.listen(5000, () => {
    console.log("API running....")
})
