const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://NIRAL:niral072021@cluster0.kdeab.mongodb.net/hotel?retryWrites=true&w=majority')
const Schema = mongoose.Schema;
const bookimg = new Schema({
    foodname: { type: Schema.Types.ObjectId, ref: "food" },
    count: { type: String },
    user: { type: String }


})
var bookdata = mongoose.model('booknow', bookimg)
module.exports = bookdata;