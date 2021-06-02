const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var userSchema = new Schema({
    fullName:{
        type:String,
        required: true
    },
    ID:{
        type:String,
        
    },
    passport:{
        type:Number,
       
    },
    phone:{
        type:Number,
        
    },
    role:{
        type:String,
        default:"Intern"
    },
    roleNumber:{
        type:Number,
        default:1
    }
});

module.exports = mongoose.model("user", userSchema);