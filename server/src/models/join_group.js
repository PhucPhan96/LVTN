const mongoose = require('mongoose');
const objectId = mongoose.Schema.Types.ObjectId;
const schema = mongoose.Schema;

var joinGroupSchema = new schema({
    user : {type : objectId, ref : 'user'},
    group : {type : objectId, ref : 'group'},
    date_join : Date,
    status : String
});

module.exports = mongoose.model('join_group', joinGroupSchema);
// var join_group = mongoose.model('join_group', joinGroupSchema);
//  module.exports = join_group;
//  join_group.create({
//     'user' : '5bd9af0de0eb103174dd61c9',
//     'group' : '5bd9af47fe1e540ca04ffd41',
//     'date_join' : '2018-10-25T00:00:00Z',
//     'status' : 'joined'
// }).then(()=>{
//     console.log('craete');
// }).catch((err)=>{
//     console.log('craete ' + err);
// });