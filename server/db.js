var mongoose = require('mongoose');

// mongoose.connect("mongodb://localhost:27017/SocialMedia");
mongoose.connect("mongodb://phucphanthls:phucphan96@ds119734.mlab.com:19734/socialmedia");
var db = mongoose.Connection;

module.exports = db;
