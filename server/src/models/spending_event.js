const mongoose = require('mongoose');
const objectId = mongoose.Schema.Types.ObjectId;
const schema = mongoose.Schema;

var spendingEventSchema = new schema({
    time : Date,
    content : String,
    spending : Number,
    event : {type : objectId, ref : 'event'},
});

module.exports = mongoose.model('spending_event', spendingEventSchema);
// var spending_event = mongoose.model('spending_event', spendingEventSchema);
//  module.exports = spending_event;
//  spending_event.create({
//     'time' : '2019-01-20T00:00:00Z',
//     'content' : 'Mua quà',
//     'spending' : '2000000',
//     'event' : '5c0aa31e4d7a6132ec13287a',
    
// }).then(()=>{
//     console.log('craete');
// }).catch((err)=>{
//     console.log('craete ' + err);
// });