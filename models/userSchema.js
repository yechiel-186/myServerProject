const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var userSchema = new Schema({
    fullName:{
        type:String,
        required: true
    },
    ID:{
        type:String,
        unique: true
        
    },
    passport:{
        type:Number,
       
    },
    phone:{
        type:Number,
        unique: true
    },
    role:{
        type:String
        
    },
    roleNumber:{
        type:Number
    },
    image:{
        type:String
    },
    typeUser:{
        type:mongoose.Types.ObjectId,refPath:'role'
    }


});

module.exports = mongoose.model("user", userSchema);