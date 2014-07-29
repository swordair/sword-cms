var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var Page = new Schema({
    id: String,
    title: String,
    content: String
});


module.exports = mongoose.model('Page', Page);