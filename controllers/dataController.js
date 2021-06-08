const userSchema = require("../models/userSchema");
const userToken=require("../models/userToken");


function dataController(req,res,next){
    var newUser=new userToken(false,req.headers['x-access-token']);
    if(newUser.isNotExpired){
        console.log("token work");
       req.user=newUser;
    return next()
    }
    res.status(404).send()
}

module.exports=dataController;
