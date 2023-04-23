const path = require('path');
const fs = require('fs');

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require("body-parser");

const User = require("./../model/userDetails.js");
const Stat = require("./../model/statDetails.js");

let getUser = async (req, res) => {
    console.log(mongoose.connection.readyState)
    let x = await Stat.find({});
    res.json(x)
}

let createUser = async(req, res) => {
    await User.collection.insertOne({
        uName: req.body.uName,
        password: req.body.password,
        email: req.body.email,
        fName: req.body.fName,
        lName: req.body.lName,
        age: req.body.age,
        gender: req.body.gender
        })
    await Stat.collection.insertOne({
        uName: req.body.uName,
        played: [0,0,0],
        wins: [0,0,0],
        losses: [0,0,0]
    })
    res.sendStatus(200)
}

let updateUser = async(req, res) => {
    await User.updateOne({uName: req.body.uName},{fName: req.body.fName, lName: req.body.lName})
    res.sendStatus(200)
}

let deleteUser = async(req, res) => {
    await User.deleteOne({uName: req.body.uName})
    await Stat.deleteOne({uName: req.body.uName})
    console.log(req.body.uName)
    res.sendStatus(200)
}

module.exports = {
    getUser: getUser,
    createUser: createUser,
    updateUser: updateUser,
    deleteUser: deleteUser
}