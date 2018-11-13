'use strict';
const FriendController = require('../controllers/friendController.js');

module.exports = (app) => {
    app.route('/getAllFriend')
        .post(FriendController.getAllFriend);
};