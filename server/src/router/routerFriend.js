'use strict';
const FriendController = require('../controllers/friendController.js');

module.exports = (app) => {
    app.route('/getAllFriend/:id')
        .get(FriendController.getAllFriend);
    app.route('/checkFriend')
        .post(FriendController.checkFriend);
    app.route('/addFriend')
        .post(FriendController.addFriend);
    app.route('/unFriend/:user_one/:user_two')
        .post(FriendController.unFriend);
};