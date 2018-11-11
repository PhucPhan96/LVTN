const mongoose = require('mongoose');
const objectId = mongoose.Schema.Types.ObjectId;
const schema = mongoose.Schema;

var eventSchema = new schema({
    title : String,
    time_create : Date,
    content : String,
    imgpath : String,
    event_start : Date,
    event_end : Date,
    event_address : String,
    totalcost : Number,
    user_create : {type : objectId, ref : 'user'},
    group : {type : objectId, ref : 'group'}
});

module.exports = mongoose.model('event', eventSchema);
// var event = mongoose.model('event', eventSchema);
//  module.exports = event;
//  event.create({
//     'title' : 'Nghĩa Tình',
//     'time_create' : 2018-12-12,
//     'content' : 'ahii',
//     'imgpath' : 'C:/img/nghiatinh.jpg',
//     'event_start' : 2018-12-21,
//     'event_end' : 2018-12-24,
//     'event_address' : '203 Phan Văn Trị',
//     'totalcost' : 50000000,
//     'user_create' : '5bd9af0de0eb103174dd61c9',
//     'group' : '5bd9af47fe1e540ca04ffd41'
// }).then(()=>{
//     console.log('craete');
// }).catch((err)=>{
//     console.log('craete ' + err);
// });