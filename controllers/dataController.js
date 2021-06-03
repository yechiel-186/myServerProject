const userSchema = require("../models/userSchema");
const userToken=require("../models/userToken");


function dataController(req,res){
    var newUserToken=new userToken(false,req.body.token);
    userSchema.findOne(newUserToken(),function(err,doc){
        if(err){
           return res.status(303).send();
        }
        console.log(doc)
        return res.status(201).send("is Verified");
    });

    return{
        getData:getData 
    }

}

module.exports=dataController();

