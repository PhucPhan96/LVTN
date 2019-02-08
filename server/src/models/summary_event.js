const mongoose = require('mongoose');
const objectId = mongoose.Schema.Types.ObjectId;
const schema = mongoose.Schema;

var summaryEvent = new schema({
    funds_group : Number,
    total_collect : Number,
    total_spend : Number,
    event : {type : objectId, ref : 'event'}
});

module.exports = mongoose.model('summaryevent', summaryEvent);

// var summaryevent = mongoose.model('summaryevent', summaryEvent);
//  module.exports = summaryevent;
//  summaryevent.create({
//     'funds_group' : 0,
//     'total_collect' : 0,
//     'total_spend' : 0,
//     'event' : '5c0aa31e4d7a6132ec13287a'
// }).then(()=>{
//     console.log('craete');
// }).catch((err)=>{
//     console.log('craete ' + err);
// });