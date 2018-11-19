const mongoose = require('mongoose');
const objectId = mongoose.Schema.Types.ObjectId;
const schema = mongoose.Schema;

var conversationSchema = new schema({
    user_one : {type : objectId, ref : 'user'},
    user_two : {type : objectId, ref : 'user'}
});

module.exports = mongoose.model('conversation', conversationSchema);
// var conversation = mongoose.model('conversation', conversationSchema);
//  module.exports = conversation;
//  conversation.create({
//     'user_send' : '5bd9af0de0eb103174dd61c9',
//     'user_receive' : '5bd9b51266eece3bdc942825',
// }).then(()=>{
//     console.log('craete');
// }).catch((err)=>{
//     console.log('craete ' + err);
// });