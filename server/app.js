var express = require('express');
var app = express();
var bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
var db = require('./db');
var multer = require('multer');
var logger = require('morgan');
// var router = require('./src/controllers/userController');
// var user = require('./src/models/user');
// var groupModel = require('./src/models/group');
// var event = require('./src/models/event');
// var friend = require('./src/models/friend');
// var message = require('./src/models/message');
// var post = require('./src/models/post');
// var cmt_post = require('./src/models/cmt_post');
// var like_post = require('./src/models/like_post');
// var join_event = require('./src/models/join_event');
// var join_group = require('./src/models/join_group');
// var cmt_event = require('./src/models/cmt_event');
// var donate = require('./src/models/donate');
// var plan = require('./src/models/plan');
// var plan_detail = require('./src/models/plan_detail');
// var like_event = require('./src/models/like_event');
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

var corsOptions = {
  // origin: 'http://localhost:4200',
  origin: '*',
  method: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  Header: 'Access-Control-Allow-Origin, Content-Type, Authorization, Content-Length, X-Requested-With, x-access-token',
}
// }
// app.use(function(req, res, next) {
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//   res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE, OPTIONS, PUT');
//   next();
// });

// app.options("*",function(req,res,next){
//   res.header("Access-Control-Allow-Origin", req.get("Origin")||"*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   res.header('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE, PUT, OPTIONS');
//    //other headers here
//   // res.status(200).end();
// });

app.use(cors(corsOptions));

const index = require('./src/router/index');
app.use('/', index);
require('./src/router/routerUser.js')(app);
require('./src/router/routerFriend.js')(app);

var store = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './public/images');
  },
  filename: function (req, file, callback) {
    callback(null, file.originalname);
  }
});
var upload = multer({ storage: store }).single('userPhoto');

app.post('/api/uploadimg', function (req, res) {
  upload(req, res, function (err) {
    if (err) {
      return res.end("Error uploading file.");
    }
    res.end("File is uploaded");
  });
});

app.listen(3200);

module.exports = app;