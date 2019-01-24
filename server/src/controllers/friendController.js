'use strict';
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Friend = require('../models/friend.js');
const Users = require('../models/user.js');
const jwt = require('jsonwebtoken');

var friend = {
    getAllFriend: (req, res) => {
        Friend.find({ $or: [{ 'user_one': req.params.id }, { 'user_two': req.params.id }] }, function (err, rs) {
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
    },

    checkFriend: (req, res) => {
        Friend.findOne({ $or: [{ "user_one": req.body.user_one, 'user_two': req.body.user_two }, { "user_one": req.body.user_two, 'user_two': req.body.user_one }] }, function (err, result) {
            if (err) {
                res.send("Error!");
            }
            else {
                if (result == null || result == undefined || result.length == 0) {
                    res.json({
                        error: true,
                        msg: 'notexist',
                        data: result,
                    });
                }
                else {
                    res.json({
                        error: false,
                        msg: 'OK',
                        data: result,
                    });
                }
            }
        });
    },

    addFriend: (req, res) => {
        var body = req.body;
        Friend.create(body, function (err, rs) {
            if (err) {
                res.send("Error!");
            }
            else {
                res.json(rs);
            }
        })
    },

    unFriend: (req, res) => {
        Friend.deleteOne({ $or: [{ "user_one": req.params.user_one, 'user_two': req.params.user_two }, { "user_one": req.params.user_two, 'user_two': req.params.user_one }]} , function (err, rs) {
            if (err) {
                res.send("Error!");
            }
            else {
                res.json(rs);
            }
        })
    },

    getAllFriendCommon: (req, res) => {

    }
}

module.exports = friend;