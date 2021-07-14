const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var testSchema = new Schema({
    subject:String,
    score:Number,
    questionsUrl:String,
    answersUrl:String,
    new:{
        type:Boolean,
        default:true
    },
    date:{
        type:Date,
        default:Date.now()
    },
    supervisor:String
});

module.exports = mongoose.model("test", testSchema);