const mongoose = require('mongoose');
const objectId = mongoose.Schema.Types.ObjectId;
const schema = mongoose.Schema;

var cmtEventSchema = new schema({
    user : {type : objectId, ref : 'user'},
    event : {type : objectId, ref : 'event'},
    comment : String
});

module.exports = mongoose.model('cmt_event', cmtEventSchema);
// var cmt_event = mongoose.model('cmt_event', cmtEventSchema);
//  module.exports = cmt_event;
//  cmt_event.create({
//     'user' : '5bd9af0de0eb103174dd61c9',
//     'event' : '5bd9b0b4b6354f1324dc5219',
//     'comment' : 'Á Đù'
// }).then(()=>{
//     console.log('craete');
// }).catch((err)=>{
//     console.log('craete ' + err);
// });