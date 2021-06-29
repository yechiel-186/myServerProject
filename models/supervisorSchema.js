const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var supervisorSchema = new Schema({
    
    academic:{
        type:Schema.Types.ObjectId,ref:'academic'
    },
    interns:[{
        type:Schema.Types.ObjectId,ref:'intern'
    }]






});

module.exports = mongoose.model("supervisor", supervisorSchema);




