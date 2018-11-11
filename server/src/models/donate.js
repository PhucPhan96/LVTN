const mongoose = require('mongoose');
const objectId = mongoose.Schema.Types.ObjectId;
const schema = mongoose.Schema;

var donateSchema = new schema({
    item : String,
    quality : Number,
    user : {type : objectId, ref : 'user'},
    event : {type : objectId, ref : 'event'},
});

module.exports = mongoose.model('donate', donateSchema);
// var donate = mongoose.model('donate', donateSchema);
//  module.exports = donate;
//  donate.create({
//     'item' : 'monney',
//     'quality' : 3000000,
//     'user' : '5bd9af0de0eb103174dd61c9',
//     'event' : '5bd9b0b4b6354f1324dc5219',
// }).then(()=>{
//     console.log('craete');
// }).catch((err)=>{
//     console.log('craete ' + err);
// });