var express = require('express');
var app = express();
var bodyParser = require('body-parser');
// const cors = require('cors');
const path = require('path');
var db = require('./db');
var multer = require('multer');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// var corsOptions = {
//   origin: 'http://localhost:4200',
//   // origin: '*',
//   method: 'GET,HEAD,PUT,PATCH,POST,DELETE',
//   Header: 'Access-Control-Allow-Origin, Conten t-Type, Authorization, Content-Length, X-Requested-With, x-access-token',
  
// }
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE, OPTIONS, PUT');
  next();
});

// app.use(cors(corsOptions));

const index = require('./src/router/index');
app.use('/', index);
require('./src/router/routerUser.js')(app);

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