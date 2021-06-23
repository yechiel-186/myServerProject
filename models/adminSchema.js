const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var adminSchema=new Schema(
    {
        user:{
            type:Schema.Types.ObjectId,ref:'user'
        },
        password:String,
        academics:[{
            type:mongoose.Types.ObjectId,ref:'academic'
        }]

    }
)
module.exports=mongoose.model("admin",adminSchema);