const mongoose = require('mongoose');
const objectId = mongoose.Schema.Types.ObjectId;
const schema = mongoose.Schema;

var fundsGroupSchema = new schema({
    group : {type : objectId, ref : 'group'},
    name_item : String,
    quality : Number,
    unit : String,
    from_event : {type : objectId, ref : 'event'}
});

module.exports = mongoose.model('funds_group', fundsGroupSchema);
// var fundsGroup = mongoose.model('funds_group', fundsGroupSchema);
//  module.exports = fundsGroup;
//  fundsGroup.create({
//     'group' : '5bd9af47fe1e540ca04ffd41',
//     'name_item' : 'Tiền mặt',
//     'quality' : 3000000,
//     'unit' : 'VND',
//     'from_event' : '5c013b071fb66b3440e05864',
// }).then(()=>{
//     console.log('craete');
// }).catch((err)=>{
//     console.log('craete ' + err);
// });