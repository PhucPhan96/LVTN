var mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/SocialMedia");
var db = mongoose.Connection;

module.exports = db;
