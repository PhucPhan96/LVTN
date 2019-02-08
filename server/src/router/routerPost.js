'use strict'
var PostController = require('./../controllers/postController');

module.exports = (app) => {
    app.route('/createPost')
        .post(PostController.createPost);
    app.route('/getAllPost/:_id/:skip/:limit')
        .get(PostController.getAllPost);
    app.route('/getAllCmtPost/:_id')
        .get(PostController.getAllCmtPost);
    app.route('/getAllLikePost/:_id')
        .get(PostController.getAllLikePost);
    app.route('/getPostByID/:_id')
        .get(PostController.getPostByID);
    app.route('/likePost')
        .post(PostController.likePost);
    app.route('/dislikePost')
        .post(PostController.dislikePost);
    app.route('/checkLikePost')
        .post(PostController.checkLikePost);
    app.route('/getAllPostOfGroup/:_id/:skip/:limit')
        .get(PostController.getAllPostOfGroup);
    app.route('/getAllPostOfUser/:_id')
        .get(PostController.getAllPostOfUser);
}