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
    age:{
        type:Number
    },
    country:{
    type:String
    },
    city:{
        type:String
    },
    graducition:{
        type:Number
    },
    academic:{
        type:String
    },
    medical:{
        type:String
    },
    residency:{
        type:String
    },
    department:{
        type:String
    },
    yearResidency:{
        type:Number
    },
    typeUser:{
        type:mongoose.Types.ObjectId,refPath:'role'
    }


});

module.exports = mongoose.model("user", userSchema);