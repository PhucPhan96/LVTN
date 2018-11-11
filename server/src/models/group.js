const mongoose = require('mongoose');
const objectId = mongoose.Schema.Types.ObjectId;
const schema = mongoose.Schema;
const member = require('./user');

var groupSchema = new schema({
    name : String,
    intro : String,
    location_active : String,
    contact : String,
    avatarpath : String,
    coverpath : String,
    admin : {type : objectId, ref : 'user', required: false}
});

module.exports = mongoose.model('group', groupSchema);
// var group = mongoose.model('group', groupSchema);
//  module.exports = group;
//  group.create({
//     name : 'Volunteer',
//     intro : 'ahihi đồ ngốc',
//     location_active : '30 Điện Biên Phủ',
//     contact : '0912345456',
//     avatarpath : 'C:/img/avatar',
//     coverpath : 'C:/img/cover',
//     admin : '5bd9af0de0eb103174dd61c9'
// }).then(()=>{
//     console.log('craete');
// }).catch((err)=>{
//     console.log('craete ' + err);
// });