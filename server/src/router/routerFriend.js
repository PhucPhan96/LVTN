'use strict';
const FriendController = require('../controllers/friendController.js');

module.exports = (app) => {
    app.route('/getAllFriend/:id')
        .get(FriendController.getAllFriend);
};