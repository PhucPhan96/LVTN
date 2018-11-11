const mongoose = require('mongoose');
const objectId = mongoose.Schema.Types.ObjectId;
const schema = mongoose.Schema;

var postSchema = new schema({
    title : String,
    time_create : Date,
    content : String,
    img_path : String,
    group : {type : objectId, ref : 'group'},
    user : {type : objectId, ref : 'user'}
});

module.exports = mongoose.model('post', postSchema);
// var post = mongoose.model('post', postSchema);
//  module.exports = post;
//  post.create({
//     'title' : 'Oh Yeah',
//     'time_create' : '2003-05-13T00:00:00Z',
//     'content' : 'abcdefghiklmnogh',
//     'img_path' : 'C:/image/img.jpg',
//     'group' : '5bd9af47fe1e540ca04ffd41',
//     'user' : '5bd9af0de0eb103174dd61c9'
// }).then(()=>{
//     console.log('craete');
// }).catch((err)=>{
//     console.log('craete ' + err);
// });