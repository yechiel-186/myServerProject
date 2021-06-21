const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var internSchema=new Schema ({
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
    testGet:[{
        type:mongoose.Types.ObjectId,refPath:'test'
    }],
    testPost:[{
        type:mongoose.Types.ObjectId,refPath:'test'
    }]
});

module.exports=mongoose.model("intern",internSchema);