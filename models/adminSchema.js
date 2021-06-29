const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var adminSchema=new Schema(
    {
        password:String,
        supervisors:[{
            type:mongoose.Types.ObjectId,ref:'user'
        }],
        academics:[{
            type:mongoose.Types.ObjectId,ref:'academic'
        }]

    }
)
module.exports=mongoose.model("admin",adminSchema);