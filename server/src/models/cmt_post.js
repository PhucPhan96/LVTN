const mongoose = require('mongoose');
const objectId = mongoose.Schema.Types.ObjectId;
const schema = mongoose.Schema;

var cmtPostSchema = new schema({
    user : {type : objectId, ref : 'user'},
    event : {type : objectId, ref : 'event'},
    comment : String
});

module.exports = mongoose.model('cmt_post', cmtPostSchema);
// var cmt_post = mongoose.model('cmt_post', cmtPostSchema);
//  module.exports = cmt_post;
//  cmt_post.create({
//     'user' : '5bd9af0de0eb103174dd61c9',
//     'event' : '5bd9b0b4b6354f1324dc5219',
//     'comment' : 'Quá tuyệt vời!'
// }).then(()=>{
//     console.log('craete');
// }).catch((err)=>{
//     console.log('craete ' + err);
// });