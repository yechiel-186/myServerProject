const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var supervisorSchema = new Schema({
    
    academic:{
        type:Schema.Types.ObjectId,ref:'academic'
    },
    interns:[{
        type:Schema.Types.ObjectId,ref:'intern'
    }],
    tests:[{
        type:Schema.Types.ObjectId,ref:'test'
    }]






});

module.exports = mongoose.model("supervisor", supervisorSchema);




