const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var loginSchema=new Schema ({
    code:{
        type:String
    },
    Verified:{
        type:Boolean,
        default:false
    }
});

module.exports=mongoose.model("login",loginSchema);