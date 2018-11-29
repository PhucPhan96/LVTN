const mongoose = require('mongoose');
const objectId = mongoose.Schema.Types.ObjectId;
const schema = mongoose.Schema;

var cmtPostSchema = new schema({
    user : {type : objectId, ref : 'user'},
    post : {type : objectId, ref : 'post'},
    comment : String,
    time_cmt : Date
});

module.exports = mongoose.model('cmt_post', cmtPostSchema);
// var cmt_post = mongoose.model('cmt_post', cmtPostSchema);
//  module.exports = cmt_post;
//  cmt_post.create({
//     'user' : '5bd9af0de0eb103174dd61c9',
//     'post' : '5bfb7cccbc3450365c2015b2',
//     'comment' : 'Quá tuyệt vời!',
//     'time_cmt' : '2018-11-26T04:55:40.918Z'
// }).then(()=>{
//     console.log('craete');
// }).catch((err)=>{
//     console.log('craete ' + err);
// });