const mongoose = require('mongoose')
    // mongoose.connect('mongodb://localhost:27017/hotel')
mongoose.connect('mongodb+srv://NIRAL:niral072021@cluster0.kdeab.mongodb.net/hotel?retryWrites=true&w=majority')

const Schema = mongoose.Schema;
const addcat = new Schema({
    menucat: String
})
var categorydata = mongoose.model('menucategory', addcat)
module.exports = categorydata;