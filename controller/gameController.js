const path = require('path');
const fs = require('fs');

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const redis = require("redis");

const User = require("./../model/userDetails.js");
const Stat = require("./../model/statDetails.js");

const redisClient = redis.createClient("redis://red-ch3egirh4hsum435no8g:6379")

let ticFunc = async (req, res) => {
    redisClient.get("tic", async(error,lst) => {
        let x;
        if(error) console.log(error)
        if(lst != null){
            console.log("Cache hit")
            x = JSON.parse(lst)
        }else{
            console.log("Cache miss")
            x = await Stat.find({},"uName wins").limit(6);
            redisClient.setex("tic", 10, JSON.stringify(x))
        }
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
        res.status(200)
        res.json(x)
    })
}

let snakeFunc = async (req, res) => {
    redisClient.get("snk", async(error,lst) => {
        let x;
        if(error) console.log(error)
        if(lst != null){
            console.log("Cache hit")
            x = JSON.parse(lst)
        }else{
            console.log("Cache miss")
            x = await Stat.find({},"uName wins").limit(6);
            redisClient.setex("snk", 10, JSON.stringify(x))
        }
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
        res.status(200)
        res.json(x)
    })
}

let ludoFunc = async (req, res) => {
    redisClient.get("ludo", async(error,lst) => {
        let x;
        if(error) console.log(error)
        if(lst != null){
            console.log("Cache hit")
            x = JSON.parse(lst)
        }else{
            console.log("Cache miss")
            x = await Stat.find({},"uName wins").limit(6);
            redisClient.setex("ludo", 10, JSON.stringify(x))
        }
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
        res.status(200)
        res.json(x)
    })
}

module.exports = {
    ticFunc: ticFunc,
    snakeFunc: snakeFunc,
    ludoFunc: ludoFunc
}