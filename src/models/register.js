const mongoose = require('mongoose')
    // mongoose.connect('mongodb://localhost:27017/hotel') //connection to database
mongoose.connect('mongodb+srv://NIRAL:niral072021@cluster0.kdeab.mongodb.net/hotel?retryWrites=true&w=majority')

const Schema = mongoose.Schema; //schema maps to a mongodb coolection and provide structure for the document
const RegisterSchema = new Schema({
    name: String,
    phone: String,
    email: String,
    username: String,
    password: String,

})
var Regdata = mongoose.model('registerdata', RegisterSchema)
module.exports = Regdata;