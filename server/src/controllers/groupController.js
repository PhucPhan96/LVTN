'use strict';
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var Group = require('./../models/group');
var GroupJoin = require('./../models/join_group');

var group = {
    getAllGroupJoined : (req, res) => {
        GroupJoin.find({'user' : req.params._id}, function(err, rs){
            if (err || !rs) {
                console.log(`Error ${err}`);
                res.json({ result: 0, msg: `${err}`, rs: {} });
            } else
                res.json({ result: 1, msg: rs || {} });
            })
            .populate(['user', 'group'])
            .exec(function (err, users) {
                if (err) console.log(err);
                else console.log(users)
            })
    },

    getAllGroupUserAdmin : (req, res) => {
        Group.find({'admin' : req.params._id}, function(err, rs){
            if (err || !rs) {
                console.log(`Error ${err}`);
                res.json({ result: 0, msg: `${err}`, rs: {} });
            } else
                res.json({ result: 1, msg: rs || {} });
            })
    },

    getAllMemberGroupMain : (req, res) => {
        GroupJoin.find({'group' : req.params._id}, 'user', function(err, rs){
            if (err || !rs) {
                console.log(`Error ${err}`);
                res.json({ result: 0, msg: `${err}`, rs: {} });
            } else
                res.json({ result: 1, msg: rs || {} });
            })
            .populate(['user'])
            .exec(function (err, users) {
                if (err) console.log(err);
                else console.log(users)
            })
    },

    getAllMemberGroup : (req, res) => {
        GroupJoin.count({'group' : req.params._id}, function(err, rs){
            if (err) {
                res.send(err);
                return;
            }
            res.json({ count: rs });
            // })
            // .populate(['user'])
            // .exec(function (err, users) {
            //     if (err) console.log(err);
            //     else console.log(users)
            });
    },

    updateAvatar: (req, res) => {
        console.log('update avatar ' + JSON.stringify(req.body));
        Group.findOneAndUpdate({ '_id': req.body._id }, { 'avatarpath': req.body.path }, (err, data) => {
            if (err || !data) {
                console.log(`Update error ${err}`);
                res.json({ result: 0, msg: `${err}`, data: {} });
            } else
                res.json({ result: 1, msg: data || {} });
        })
    },

    updateCover: (req, res) => {
        console.log('update cover ' + JSON.stringify(req.body));
        Group.findOneAndUpdate({ '_id': req.body._id }, { 'coverpath': req.body.path }, (err, data) => {
            if (err || !data) {
                console.log(`Update error ${err}`);
                res.json({ result: 0, msg: `${err}`, data: {} });
            } else
                res.json({ result: 1, msg: data || {} });
        })
    },

    createGroup : (req, res) => {
        var group = req.body;
        Group.create(group, function (err, result) {
            if (err) {
                res.send("Error!");
            }
            else {
                res.json(result);
            }
        });
    },

    getGroupByID : (req, res) => {
        Group.find({'_id' : req.params._id}, function(err, rs){
            if (err || !rs) {
                console.log(`Error ${err}`);
                res.json({ result: 0, msg: `${err}`, rs: {} });
            } else
                res.json({ result: 1, msg: rs || {} });
        })
    }
}

module.exports = group;