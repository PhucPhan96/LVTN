'use strict';
var GroupController = require('./../controllers/groupController');

module.exports = (app) => {
    app.route('/getAllGroupUserJoin/:_id')
        .get(GroupController.getAllGroupJoined);
    app.route('/getAllGroupUserAdmin/:_id')
        .get(GroupController.getAllGroupUserAdmin);
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
    app.route('/createGroup')
        .post(GroupController.createGroup);
}