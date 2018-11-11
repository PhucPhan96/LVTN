const mongoose = require('mongoose');
const objectId = mongoose.Schema.Types.ObjectId;
const schema = mongoose.Schema;

var joinEventSchema = new schema({
    user : {type : objectId, ref : 'user'},
    event : {type : objectId, ref : 'event'},
});

module.exports = mongoose.model('join_event', joinEventSchema);
// var join_event = mongoose.model('join_event', joinEventSchema);
//  module.exports = join_event;
//  join_event.create({
//     'user' : '5bd9af0de0eb103174dd61c9',
//     'event' : '5bd9b0b4b6354f1324dc5219'
// }).then(()=>{
//     console.log('craete');
// }).catch((err)=>{
//     console.log('craete ' + err);
// });