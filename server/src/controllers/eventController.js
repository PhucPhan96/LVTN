'use strict';
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var Event = require('./../models/event');
var JoinEvent = require('./../models/join_event');
var Donate = require('./../models/donate');
var SpendingEvent = require('./../models/spending_event');

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
        Event.find({ title: new RegExp(req.params.search, "i") }, function (err, rs) {
            if (err || !rs) {
                console.log(`Error ${err}`);
                res.json({ result: 0, msg: `${err}`, rs: {} });
            } else
                res.json({ result: 1, msg: rs || {} });
        })
    },

    donate: (req, res) => {
        var donate = req.body;
        Donate.create(donate, function (err, result) {
            if (err) {
                res.send("Error!");
            }
            else {
                res.json(result);
            }
        });
    },

    getAllDonateEvent: (req, res) => {
        Donate.find({ 'event': req.params.event }, function (err, rs) {
            if (err || !rs) {
                console.log(`Error ${err}`);
                res.json({ result: 0, msg: `${err}`, rs: {} });
            } else
                res.json({ result: 1, msg: rs || {} });
        })
    },

    getAllDonateReceived: (req, res) => {
        Donate.find({ 'event': req.params.event, 'status': 'Đã nhận' }, function (err, rs) {
            if (err || !rs) {
                console.log(`Error ${err}`);
                res.json({ result: 0, msg: `${err}`, rs: {} });
            } else
                res.json({ result: 1, msg: rs || {} });
        })
    },

    updateStatusDonate: (req, res) => {
        Donate.findOneAndUpdate({ '_id': req.body._id }, { 'status': 'Đã nhận' }, (err, data) => {
            if (err || !data) {
                console.log(`Update error ${err}`);
                res.json({ result: 0, msg: `${err}`, data: {} });
            } else
                res.json({ result: 1, msg: data || {} });
        })
    },

    getAllSpendingEvent: (req, res) => {
        SpendingEvent.find({ 'event': req.params.event }, function (err, rs) {
            if (err || !rs) {
                console.log(`Error ${err}`);
                res.json({ result: 0, msg: `${err}`, rs: {} });
            } else
                res.json({ result: 1, msg: rs || {} });
        })
    },

    getEventComingSoon: (req, res) => {
        var now = new Date();
        JoinEvent.find({ 'user': req.params.user, 'event.event_start' : { $gt: new Date(now).toISOString() } }, function (err, rs) {
            if (err || !rs) {
                res.json({ result: 0, msg: `${err}`, rs: {} });
            } else
                res.json({ result: 1, msg: rs || {} });
            })
            .sort({ 'event.event_start': 1 })
            .populate(['event'])
            .limit(3)
    }

    // addSpendingEvent: (req, res) => {
    //     var spend = req.body;
    //     SpendingEvent.create(spend, function (err, result) {
    //         if (err) {
    //             res.send("Error!");
    //         }
    //         else {
    //             res.json(result);
    //         }
    //     });
    // },
}

module.exports = event;