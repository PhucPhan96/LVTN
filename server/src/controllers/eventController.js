'use strict';
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var Event = require('./../models/event');
var JoinEvent = require('./../models/join_event');

var event = {
    createEvent: (req, res) => {
        var newevent = req.body;
        Event.create(newevent, function (err, result) {
            if (err) {
                res.send("Error!");
            }
            else {
                res.json(result);
            }
        });
    },

    getAllEventOfGroup: (req, res) => {
        Event.find({ 'group': req.params._id }, function (err, rs) {
            if (err || !rs) {
                console.log(`Get error ${err}`);
                res.json({ result: 0, msg: `${err}`, rs: {} });
            } else
                res.json({ result: 1, msg: rs || {} });
        })
    },

    getAllEventOfUser: (req, res) => {
        JoinEvent.find({ 'user': req.params._id }, function (err, rs) {
            if (err || !rs) {
                console.log(`Get error ${err}`);
                res.json({ result: 0, msg: `${err}`, rs: {} });
            } else
                res.json({ result: 1, msg: rs || {} });
        })
            .populate(['event'])
            .exec(function (err, users) {
                if (err) console.log(err);
                else console.log(users);
            })
    },

    joinEvent: (req, res) => {
        var joinevent = { 'user': req.body.user, 'event': req.body.event }
        JoinEvent.create(joinevent, function (err, result) {
            if (err) {
                res.send("Error!");
            }
            else {
                res.json(result);
            }
        });
    },

    leaveEvent: (req, res) => {
        JoinEvent.deleteOne({ 'user': req.body.user, 'event': req.body.event }, function (err, result) {
            if (err) {
                res.send("Error!");
            }
            else {
                res.json(result);
            }
        });
    },

    isJoin: (req, res) => {
        JoinEvent.findOne({ 'user': req.body.user, 'event': req.body.event }, function (err, rs) {
            if (err) {
                res.send("Error!");
            }
            else if (rs === null) {
                res.send("null");
                return;
            }
            else {
                res.json(rs);
            }
        })
    },

    getEventByName: (req, res) => {
        Event.find({ title: new RegExp(req.params.search, "i") }, function(err, rs) {
                if (err || !rs) {
                    console.log(`Error ${err}`);
                    res.json({ result: 0, msg: `${err}`, rs: {} });
                } else
                    res.json({ result: 1, msg: rs || {} });
            })
    },
}

module.exports = event;