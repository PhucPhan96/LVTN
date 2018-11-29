'use strict';
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Users = require('../models/user.js');
const Conversation = require('../models/conversation.js');
const Message = require('../models/message.js');
const jwt = require('jsonwebtoken');

var conversation = {
    getAllFriendChat : (req, res) =>{
        Conversation.find({ $or: [{ 'user_one': req.params.id}, { 'user_two': req.params.id}]}, function (err, rs) {
            if (err || !rs) {
                console.log(`Update error ${err}`);
                res.json({ result: 0, msg: `${err}`, rs: {} });
            } else
                res.json({ result: 1, msg: rs || {} });
            })
            .populate(['user_one', 'user_two'])
            .exec(function (err, users) {
                if (err) console.log(err);
                else console.log(users);
        })
    },
    addConversation : (req, res)=>{
        var cons = req.body;
        Conversation.create(cons, function(err, data){
            if (err) {
                res.send("Error!");
            }
            else {
                res.json(data);
            }
        })
    },

    addMessage : (req, res)=>{
        var cons = req.body;
        Message.create(cons, function(err, data){
            if (err) {
                res.send("Error!");
            }
            else {
                res.json(data);
            }
        })
    },

    getConversation : (req, res)=>{
        Message.find({'conversation' : req.params.consID}, function(err, rs){
            if (err || !rs) {
                console.log(`Update error ${err}`);
                res.json({ result: 0, msg: `${err}`, rs: {} });
            } else
                res.json({ result: 1, msg: rs || {} });
        })
        .sort({'time_send' : 1})
        .populate(['author'])
    },

    getIDConversation : (req, res) =>{
        Conversation.find({$or:[{'user_one' : req.params.user_one, 'user_two' : req.params.user_two}, {'user_one' : req.params.user_two, 'user_two' : req.params.user_one},]}, {_id :1}, function(err, rs){
            if (err || !rs) {
                console.log(`Update error ${err}`);
                res.json({ result: 0, msg: `${err}`, rs: {} });
            } else
                res.json({ result: 1, msg: rs || {} });
        })
    },

    getConversationByID : (req, res) =>{
        Conversation.find({'_id' : req.params._id}, function(err, rs){
            if (err || !rs) {
                console.log(`Error ${err}`);
                res.json({ result: 0, msg: `${err}`, rs: {} });
            } else
                res.json({ result: 1, msg: rs || {} });
        })
    }

}

module.exports = conversation;