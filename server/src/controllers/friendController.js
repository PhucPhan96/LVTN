'use strict';
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Friend = require('../models/friend.js');
const Users = require('../models/user.js');
const jwt = require('jsonwebtoken');

var friend = {
    getAllFriend: (req, res) => {
        Friend.find({ $or: [{ 'user_one': req.params.id}, { 'user_two': req.params.id}] }, function (err, rs) {
            if (err || !rs) {
                console.log(`Update error ${err}`);
                res.json({ result: 0, msg: `${err}`, rs: {} });
            } else
                res.json({ result: 1, msg: rs || {} });
            })
            .populate(['user_one', 'user_two'])
            .exec(function (err, users) {
                if (err) console.log(err);
                else console.log(users)
            })
    }
}

module.exports = friend;