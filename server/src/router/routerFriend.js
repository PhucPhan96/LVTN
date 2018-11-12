'use strict';
const UsersController = require('../controllers/friendController.js');

module.exports = (app) => {
    app.route('/getAllFriend')
        .post(UsersController.getAllFriend);
};