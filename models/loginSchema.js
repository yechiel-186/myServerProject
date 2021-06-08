const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var loginSchema=new Schema ({
    code:{
        type:String
    },
    verified:{
        type:Boolean,
        default:false
    },
    phone:{
        type:Number
    }
});

module.exports=mongoose.model("login",loginSchema);