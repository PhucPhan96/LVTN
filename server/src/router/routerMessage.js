'use strict';
const MessageController = require('../controllers/messageController.js');

module.exports = (app) => {
    app.route('/getAllFriendChat/:id')
        .get(MessageController.getAllFriendChat);
    app.route('/getConversation/:consID')
        .get(MessageController.getConversation);
    app.route('/getIDConversation/:user_one/:user_two')
        .get(MessageController.getIDConversation);
    app.route('/getConversationByID/:_id')
        .get(MessageController.getConversationByID);
    app.route('/addConversation')
        .post(MessageController.addConversation);
    app.route('/addMessage')
        .post(MessageController.addMessage);
};