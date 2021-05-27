const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var userSchema = new Schema({
    fullName:{
        type:String,
        required: true
    },
    ID_number:{
        type:Number,
        
    },
    passport:{
        type:Number,
       
    },
    phone:{
        type:Number,
        
    }
});

module.exports = mongoose.model("user", userSchema);