const mongoose = require('mongoose');
const objectId = mongoose.Schema.Types.ObjectId;
const schema = mongoose.Schema;

var likePostSchema = new schema({
    user : {type : objectId, ref : 'user'},
    post : {type : objectId, ref : 'post'}
});

module.exports = mongoose.model('like_post', likePostSchema);
// var like_post = mongoose.model('like_post', likePostSchema);
//  module.exports = like_post;
//  like_post.create({
//     'user' : '5bd9af0de0eb103174dd61c9',
//     'event' : '5bfce150d2a67818b00af3ac'
// }).then(()=>{
//     console.log('craete');
// }).catch((err)=>{
//     console.log('craete ' + err);
// });