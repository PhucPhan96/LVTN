const mongoose = require('mongoose');
const objectId = mongoose.Schema.Types.ObjectId;
const schema = mongoose.Schema;

var messageSchema = new schema({
    conversation : {type : objectId, ref : 'conversation'},
    author : {type : objectId, ref : 'user'},
    message : String,
    time_send : Date,
});

module.exports = mongoose.model('message', messageSchema);
// var message = mongoose.model('message', messageSchema);
//  module.exports = message;
//  message.create({
//     'conversation' : '5bebcdb16c75502bb02900b6',
//     'author' : '5bd9af0de0eb103174dd61c9',
//     'message' : 'Oc Cho Thinh',
//     'time_send' : '2003-05-13T00:00:00Z'
// }).then(()=>{
//     console.log('craete');
// }).catch((err)=>{
//     console.log('craete ' + err);
// });