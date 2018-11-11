const mongoose = require('mongoose');
const objectId = mongoose.Schema.Types.ObjectId;
const schema = mongoose.Schema;

var messageSchema = new schema({
    user_send : {type : objectId, ref : 'user'},
    user_receive : {type : objectId, ref : 'user'},
    message : String,
    time_send : Date
});

module.exports = mongoose.model('message', messageSchema);
// var message = mongoose.model('message', messageSchema);
//  module.exports = message;
//  message.create({
//     'user_send' : '5bd9b51266eece3bdc942825',
//     'user_receive' : '5bd9b51266eece3bdc942825',
//     'message' : 'Oc Cho Thinh',
//     'time_send' : '2003-05-13T00:00:00Z'
// }).then(()=>{
//     console.log('craete');
// }).catch((err)=>{
//     console.log('craete ' + err);
// });