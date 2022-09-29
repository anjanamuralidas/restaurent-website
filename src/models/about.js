const mongoose = require('mongoose')
    // mongoose.connect('mongodb://localhost:27017/hotel')
mongoose.connect('mongodb+srv://NIRAL:niral072021@cluster0.kdeab.mongodb.net/hotel?retryWrites=true&w=majority')
const Schema = mongoose.Schema;
const addimg = new Schema({
    menucategory: { type: Schema.Types.ObjectId, ref: "menucategory" },
    foodname: { type: String },
    rate: { type: String },
    image: { type: String }

})
var adddata = mongoose.model('food', addimg)
module.exports = adddata;