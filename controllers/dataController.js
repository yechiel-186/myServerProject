const userSchema = require("../models/userSchema");
const userToken=require("../models/userToken");


function getData(req,res){
    var newUserData=new userToken(false,req.body.token,req.body.fullName);
    userSchema.findOne(newUserData(),function(err,doc){
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

