const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var academicSchema = new Schema({
    ID:String,
    fullName:String,
    interns:[{
        type:Schema.Types.ObjectId,ref:'intern'
    }],
    supervisors:[{
        type:mongoose.Types.ObjectId,ref:'supervisor'
    }]






});

module.exports = mongoose.model("academic", academicSchema);

