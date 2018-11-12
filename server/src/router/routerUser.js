'use strict';
const UsersController = require('../controllers/userController.js');

module.exports = (app) => {
    app.route('/getAllUsers')
        .get(UsersController.getAllUser);
    app.route('/getUserByEmail')
        .post(UsersController.getUserByEmail);
    app.route('/login')
        .post(UsersController.login);
    app.route('/register')
        .post(UsersController.insert);
    app.route('/updateavatar')
        .put(UsersController.updateAvatar);
    app.route('/updatecover')
        .put(UsersController.updateCover);
    app.route('/updatepassword')
        .put(UsersController.updatePassword);
    app.route('/updateuser')
        .put(UsersController.updateUser);
};