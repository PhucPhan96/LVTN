'use strict';
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Users = require('../models/user.js');
const jwt = require('jsonwebtoken');

var users = {
    getAllUser: (req, res) => {
        Users.find({})
            .then((data) => { res.json({ data }) })
            .catch((err) => { res.json({ result: 0, msg: 'Server error', data: {} }); console.log(err); })
    },

    updateAvatar: (req, res) => {
        console.log('update avatar ' + JSON.stringify(req.body));
        Users.findOneAndUpdate({ '_id': req.body._id }, { 'avatarpath': req.body.path }, (err, data) => {
            if (err || !data) {
                console.log(`Update error ${err}`);
                res.json({ result: 0, msg: `${err}`, data: {} });
            } else
                res.json({ result: 1, msg: data || {} });
        })
    },

    updateCover: (req, res) => {
        console.log('update cover ' + JSON.stringify(req.body));
        Users.findOneAndUpdate({ '_id': req.body._id }, { 'coverpath': req.body.path }, (err, data) => {
            if (err || !data) {
                console.log(`Update error ${err}`);
                res.json({ result: 0, msg: `${err}`, data: {} });
            } else
                res.json({ result: 1, msg: data || {} });
        })
    },

    getUserByEmail: (req, res) => {
        // console.log("body: " + JSON.stringify(req.body));
        Users.findOne({ "email": req.body.email }, function (err, result) {
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

    login: (req, res) => {
        var uname = req.body.email;
        var pass = req.body.password;
        console.log(req.body);
        Users.find({ "email": uname, "password": pass }, function (err, result) {
            if (err) {
                res.send("Error!");
            }
            else {
                if (result == null || result == undefined || result.length == 0) {
                    res.json({
                        error: true,
                        msg: 'incorect',
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
    insert: (req, res) => {
        var user = req.body;
        // console.log('Adding user: ' + JSON.stringify(user));
        Users.create(user, function (err, result) {
            if (err) {
                res.send("Error!");
            }
            else {
                res.json(result);
            }
        });
    }
};
module.exports = users;