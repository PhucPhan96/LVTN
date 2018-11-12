'use strict';
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Friend = require('../models/friend.js');
const Users = require('../models/user.js');
const jwt = require('jsonwebtoken');

var friend = {
    getAllFriend : (req, res) => {
        Friend.find({'user_one' : req.body.id},(err,rs)=>{
            console.log(rs);
        })
    }
}

module.exports = friend;