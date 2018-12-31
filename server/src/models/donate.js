const mongoose = require('mongoose');
const objectId = mongoose.Schema.Types.ObjectId;
const schema = mongoose.Schema;

var donateSchema = new schema({
    type : String,
    nameitem : String,
    quality : Number,
    notice : String,
    status : String,
    unit : String,
    time : Date,
    user : {type : objectId, ref : 'user'},
    event : {type : objectId, ref : 'event'},
});

module.exports = mongoose.model('donate', donateSchema);
// var donate = mongoose.model('donate', donateSchema);
//  module.exports = donate;
//  donate.create({
//     'type' : 'Tiền mặt',
//     'nameitem' : '',
//     'quality' : 3000000,
//     'notice' : 'Công ty THL đóng góp và đã chuyển khoản.',
//     'status' : 'Đã nhận',
//     'unit' : 'VND',
//     'time' : '2018-11-26 09:46:55',
//     'user' : '5bd9af0de0eb103174dd61c9',
//     'event' : '5c013b071fb66b3440e05864',
// }).then(()=>{
//     console.log('craete');
// }).catch((err)=>{
//     console.log('craete ' + err);
// });