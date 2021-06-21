const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var supervisorSchema = new Schema({
    interns:[{
        type:Schema.Types.ObjectId,refPath:'role'
    }]






});

module.exports = mongoose.model("supervisor", supervisorSchema);




