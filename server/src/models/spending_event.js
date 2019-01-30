const mongoose = require('mongoose');
const objectId = mongoose.Schema.Types.ObjectId;
const schema = mongoose.Schema;

var spendingEventSchema = new schema({
    content : String,
    quality : Number,
    unit_price : Number,
    total: Number,
    note: String,
    event : {type : objectId, ref : 'event'},
});

module.exports = mongoose.model('spending_event', spendingEventSchema);
// var spending_event = mongoose.model('spending_event', spendingEventSchema);
//  module.exports = spending_event;
//  spending_event.create({
//     'content' : '660 Kg gạo(tương đương 660 suất)',
//     'quality' : '660',
//     'unit_price' : 11000,
//     'total' : 7260000,
//     'note' : '',
//     'event' : '5c0aa31e4d7a6132ec13287a',
    
// }).then(()=>{
//     console.log('craete');
// }).catch((err)=>{
//     console.log('craete ' + err);
// });