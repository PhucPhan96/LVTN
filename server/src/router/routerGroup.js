'use strict';
var GroupController = require('./../controllers/groupController');

module.exports = (app) => {
    app.route('/getAllGroupUserJoin/:_id')
        .get(GroupController.getAllGroupJoined);
    app.route('/getAllGroupUserAdmin/:_id')
        .get(GroupController.getAllGroupUserAdmin);
    app.route('/getGroupByName/:search')
        .get(GroupController.getGroupByName);
    app.route('/getAllMemberGroup/:_id')
        .get(GroupController.getAllMemberGroup);
    app.route('/getAllMemberGroupMain/:_id')
        .get(GroupController.getAllMemberGroupMain);
    app.route('/getGroupByID/:_id')
        .get(GroupController.getGroupByID);
    app.route('/updateAvatarGroup')
        .put(GroupController.updateAvatar);
    app.route('/updateCoverGroup')
        .put(GroupController.updateCover);
    app.route('/updateFunds')
        .put(GroupController.updateFunds);
    app.route('/createGroup')
        .post(GroupController.createGroup);
    app.route('/checkUserJoinGroup/:user/:group')
        .get(GroupController.checkUserJoinGroup);
    app.route('/joinGroup')
        .post(GroupController.joinGroup);
    app.route('/leaveGroup/:user/:group')
        .get(GroupController.leaveGroup);
}