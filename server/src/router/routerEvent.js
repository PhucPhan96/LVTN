'use strict'
var EventController = require('./../controllers/eventController');

module.exports = (app) => {
    app.route('/createSummaryEvent')
        .post(EventController.createSummaryEvent);
    app.route('/createEvent')
        .post(EventController.createEvent);
    app.route('/getSummaryOfEvent/:event')
        .get(EventController.getSummaryOfEvent);
    app.route('/getAllEventOfGroup/:_id')
        .get(EventController.getAllEventOfGroup);
    app.route('/getEventByName/:search')
        .get(EventController.getEventByName);
    app.route('/getAllEventOfUser/:_id')
        .get(EventController.getAllEventOfUser);
    app.route('/getAllEventMember/:_id')
        .get(EventController.getAllEventMember);
    app.route('/joinEvent')
        .post(EventController.joinEvent);
    app.route('/leaveEvent')
        .post(EventController.leaveEvent);
    app.route('/isJoin')
        .post(EventController.isJoin);
    app.route('/donate')
        .post(EventController.donate);
    app.route('/getAllDonateEvent/:event')
        .get(EventController.getAllDonateEvent);
    app.route('/getAllDonateReceived/:event')
        .get(EventController.getAllDonateReceived);
    app.route('/updateStatusDonate')
        .put(EventController.updateStatusDonate);
    app.route('/getAllSpendingEvent/:event')
        .get(EventController.getAllSpendingEvent);
    app.route('/getEventComingSoon')
        .get(EventController.getEventComingSoon);
    // app.route('/addSpendingEvent')
    //     .post(EventController.addSpendingEvent);
}