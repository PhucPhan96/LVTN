const mongoose = require('mongoose');
const objectId = mongoose.Schema.Types.ObjectId;
const schema = mongoose.Schema;

var planDetailSchema = new schema({
    time : Date,
    work : String,
    cost : Number,
    plan : {type : objectId, ref : 'plan'},
});

module.exports = mongoose.model('plan_detail', planDetailSchema);
// var plan_detail = mongoose.model('plan_detail', planDetailSchema);
//  module.exports = plan_detail;
//  plan_detail.create({
//     'time' : '2018-11-20T08:30:00Z',
//     'work' : 'Khởi động',
//     'cost' : 2000000,
//     'plan' : '5bd9bde05449ed0240e5c588',
// }).then(()=>{
//     console.log('craete');
// }).catch((err)=>{
//     console.log('craete ' + err);
// });