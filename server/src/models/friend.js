const mongoose = require('mongoose');
const objectId = mongoose.Schema.Types.ObjectId;
const schema = mongoose.Schema;

var friendSchema = new schema({
    user_one : {type : objectId, ref : 'user'},
    user_two : {type : objectId, ref : 'user'},
    status : String
});

module.exports = mongoose.model('friend', friendSchema);
// var friend = mongoose.model('friend', friendSchema);
//  module.exports = friend;
//  friend.create({
//     'user_one' : '5bd9b51266eece3bdc942825',
//     'user_two' : '5bd9af0de0eb103174dd61c9',
//     'status' : 'friend'
// }).then(()=>{
//     console.log('craete');
// }).catch((err)=>{
//     console.log('craete ' + err);
// });