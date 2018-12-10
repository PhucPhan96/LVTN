const mongoose = require('mongoose');
const objectId = mongoose.Schema.Types.ObjectId;
const schema = mongoose.Schema;

var eventSchema = new schema({
    title : {type : String, index : true},
    time_create : Date,
    intro : String,
    imgpath : String,
    event_start : Date,
    event_end : Date,
    event_address : String,
    total_member: Number,
    misson : String,
    target : String,
    require : String,
    user_create : {type : objectId, ref : 'user'},
    group : {type : objectId, ref : 'group'}
});

// eventSchema.index({title : 'text'});

module.exports = mongoose.model('event', eventSchema);
// var event = mongoose.model('event', eventSchema);
//  module.exports = event;
//  event.create({
    // 'title' : 'Nghĩa Tình',
    // 'time_create' : 2018-12-12,
    // 'intro' : 'Cùng nhau giúp đỡ các hoàn cảnh khó khăn.',
    // 'imgpath' : 'defaultcover.jpg',
    // 'event_start' : 2018-12-21,
    // 'event_end' : 2018-12-24,
    // 'event_address' : '203 Phan Văn Trị, phường 10, quận Gò Vấp',
    // 'total_member' : 20,
    // 'misson' : 'Vô rồi sẽ biết ahihi',
    // 'target' : 'Giúp đỡ đc 100 hoàn cảnh khó khăn',
    // 'require' : 'Chăm chỉ, thật sự muốn thiện nguyện và có trách nhiệm với công việc',
    // 'user_create' : '5bd9af0de0eb103174dd61c9',
    // 'group' : '5bd9af47fe1e540ca04ffd41'
// }).then(()=>{
//     console.log('craete');
// }).catch((err)=>{
//     console.log('craete ' + err);
// });