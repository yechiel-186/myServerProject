const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var testSchema = new Schema({
    testName:String,
    subject:String,
    url:String,
    score:Number,
    new:{
        type:Boolean,
        default:true
    },
    date:{
        type:Date,
        default:Date.now()
    },
    supervisor:{
        type:mongoose.Types.ObjectId,ref:'user'
    },
    intern:{
        type:mongoose.Types.ObjectId,ref:'user'
    }
});

module.exports = mongoose.model("test", testSchema);