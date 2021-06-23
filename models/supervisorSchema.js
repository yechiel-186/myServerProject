const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var supervisorSchema = new Schema({
    user:{
        type:Schema.Types.ObjectId,ref:'user'
    },
    academic:{
        type:Schema.Types.ObjectId,ref:'academic'
    },
    interns:[{
        type:Schema.Types.ObjectId,refPath:'role'
    }]






});

module.exports = mongoose.model("supervisor", supervisorSchema);




