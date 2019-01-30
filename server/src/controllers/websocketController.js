var Message = require('./../models/message');
var Post = require('./../models/post');
var CmtPost = require('./../models/cmt_post');
const PlanDetail = require('./../models/plan_detail.js');
const SpendingEvent = require('./../models/spending_event.js');

exports = module.exports = function (io) {
    io.on('connection', (socket) => {
        console.log('new connection made');

        socket.on('join', (data) => {
            console.log(data);
            socket.join(data);
        });

        socket.on('leave', (data) => {
            console.log(data);
            socket.leave(data);
        });

        socket.on('message', (data)=>{
            console.log(data);
            
            io.in(data.room).emit('new message', data);
            Message.create(
                {
                    "conversation" : data.room,
                    "author" : data.author,
                    "message" : data.message,
                    "time_send" : data.time_send
                })
        });

        socket.on('post', (data)=>{
            console.log(data);
            
            io.sockets.emit('newpost', data);
            Post.create(
                {
                    "content" : data.content,
                    "img_path" : data.img_path,
                    "time_create" : data.time_create,
                    "group" : data.group,
                    "user" : data.user
                }, function(err, rs){
                    if(err) console.log(err);
                    else console.log(rs);
                })
        });

        socket.on('comment', (data)=>{
            console.log(data);
            
            io.sockets.emit('newComment', data);
            CmtPost.create(
                {
                    "user" : data.user,
                    "post" : data.post,
                    "comment" : data.comment,
                    "time_cmt" : data.time_cmt
                }, function(err, rs){
                    if(err) console.log(err);
                    else console.log(rs);
                })
        });

        socket.on('itemPlan', (data)=>{
            console.log(data);
            
            io.sockets.emit('newItemPlan', data);
            PlanDetail.create(
                {
                    "time" : data.time,
                    "work" : data.work,
                    "cost" : data.cost,
                    "plan" : data.plan
                }, function(err, rs){
                    if(err) console.log(err);
                    else console.log(rs);
                })
        });

        socket.on('spendingevent', (data)=>{
            console.log(data);
            
            io.sockets.emit('newSpendingEvent', data);
            SpendingEvent.create(
                {
                    "content" : data.content,
                    "quality" : data.quality,
                    "unit_price" : data.unit_price,
                    "total" : data.total,
                    "note" : data.note,
                    "event" : data.event
                }, function(err, rs){
                    if(err) console.log(err);
                    else console.log(rs);
                })
        });
    });
}