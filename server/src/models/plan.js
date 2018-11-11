const mongoose = require('mongoose');
const objectId = mongoose.Schema.Types.ObjectId;
const schema = mongoose.Schema;

var planSchema = new schema({
    event : {type : objectId, ref : 'event'},
});

module.exports = mongoose.model('plan', planSchema);
// var plan = mongoose.model('plan', planSchema);
//  module.exports = plan;
//  plan.create({
//     'event' : '5bd9b0b4b6354f1324dc5219',
// }).then(()=>{
//     console.log('craete');
// }).catch((err)=>{
//     console.log('craete ' + err);
// });