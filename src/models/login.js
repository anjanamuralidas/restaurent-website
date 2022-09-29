const mongoose = require('mongoose')
    // mongoose.connect('mongodb://localhost:27017/hotel') //connection to database
mongoose.connect('mongodb+srv://NIRAL:niral072021@cluster0.kdeab.mongodb.net/hotel?retryWrites=true&w=majority')

const Schema = mongoose.Schema; //schema maps to a mongodb coolection and provide structure for the document
const loginSchema = new Schema({
    username: String,
    password: String,

})
var logdata = mongoose.model('logindata', loginSchema)
module.exports = logdata;