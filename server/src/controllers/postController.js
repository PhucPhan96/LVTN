'use strict';
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var Post = require('./../models/post');
var CmtPost = require('./../models/cmt_post');
var LikePost = require('./../models/like_post');

var post = {
    createPost: (req, res) => {
        var newpost = req.body;
        Post.create(newpost, function (err, result) {
            if (err) {
                res.send("Error!");
            }
            else {
                res.json(result);
            }
        });
    },
    getAllPost: (req, res) => {
        Post.find({ 'group': req.params._id }, function (err, rs) {
            if (err || !rs) {
                console.log(`Get error ${err}`);
                res.json({ result: 0, msg: `${err}`, rs: {} });
            } else
                res.json({ result: 1, msg: rs || {} });
        })
            .skip(parseInt(req.params.skip))
            .limit(parseInt(req.params.limit))
            .sort({ 'time_create': -1 })
            .populate(['group', 'user'])
            .exec(function (err, users) {
                if (err) console.log(err);
                else console.log(users);
            })
    },

    getAllPostOfUser: (req, res) => {
        Post.find({ 'user': req.params._id }, function (err, rs) {
            if (err || !rs) {
                console.log(`Get error ${err}`);
                res.json({ result: 0, msg: `${err}`, rs: {} });
            } else
                res.json({ result: 1, msg: rs || {} });
        })
    },

    getAllCmtPost: (req, res) => {
        CmtPost.find({ 'post': req.params._id }, function (err, rs) {
            if (err || !rs) {
                console.log(`Get error ${err}`);
                res.json({ result: 0, msg: `${err}`, rs: {} });
            } else
                res.json({ result: 1, msg: rs || {} });
        })
            .sort({ 'time_cmt': 1 })
            .populate(['post', 'user'])
            .exec(function (err, users) {
                if (err) console.log(err);
                else console.log(users);
            })
    },

    getPostByID: (req, res) => {
        Post.find({ '_id': req.params._id }, function (err, rs) {
            if (err || !rs) {
                console.log(`Error ${err}`);
                res.json({ result: 0, msg: `${err}`, rs: {} });
            } else
                res.json({ result: 1, msg: rs || {} });
        })
    },

    likePost: (req, res) => {
        var likepost = { 'user': req.body.user, 'post': req.body.post }
        LikePost.create(likepost, function (err, result) {
            if (err) {
                res.send("Error!");
            }
            else {
                res.json(result);
            }
        });
    },

    dislikePost: (req, res) => {
        LikePost.deleteOne({ 'user': req.body.user, 'post': req.body.post }, function (err, result) {
            if (err) {
                res.send("Error!");
            }
            else {
                res.json(result);
            }
        });
    },

    checkLikePost: (req, res) => {
        LikePost.findOne({ 'user': req.body.user, 'post': req.body.post }, function (err, result) {
            if (result === null) {
                res.send("nolike");
                return;
            }
            else {
                res.json(result);
            }
        });
    },

    getAllPostOfGroup: (req, res) => {
        Post.find({ 'group': req.params._id }, function (err, rs) {
            if (err || !rs) {
                console.log(`Error ${err}`);
                res.json({ result: 0, msg: `${err}`, rs: {} });
            } else
                res.json({ result: 1, msg: rs || {} });
        })
            .populate(['user', 'group'])
    },
}

module.exports = post;