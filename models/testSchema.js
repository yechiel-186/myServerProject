const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var testSchema = new Schema({
    
});

module.exports = mongoose.model("test", testSchema);