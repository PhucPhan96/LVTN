'use strict';
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Friend = require('../models/friend.js');
const Users = require('../models/user.js');
const jwt = require('jsonwebtoken');

var friend = {
    getAllFriend: (req, res) => {
        Friend.find({ $or: [{ 'user_one': req.body.id }, { 'user_two': req.body.id }]}, function(err, rs) {
            console.log(rs);
        })
            // .populate(['user_one', 'user_two'])
            // .exec(function (err, users) {
            //     if (err) console.log(err);
            //     else console.log(users)
            // })
    }
}

module.exports = friend;