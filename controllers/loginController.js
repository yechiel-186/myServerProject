const loginSchema = require("../models/loginSchema");
const userSchema=require("../models/userSchema");
const userToken = require("../models/userToken");
 
function loginController(){
    function login(req,res){
        userSchema.findOne({ID:req.params.ID},function(err,user){
            console.log(req.params.ID);
            if(err){
                console.log("err");
                return res.status(500).send();
            }
            if(!user){
                console.log("not user");
                return res.status(401).send({"message":"dont have a intern by this ID"}); 
            }
            else{
                var code="1234";
            var userLogin=new loginSchema({code:code,phone:user.phone}); 
            userLogin.save( function (err, doc){
                if(err){
                    return res.status(404).send()} 

        return res.status(200).send({_id:doc._id})});    
            }          
        } ) 
    }
    function checkCode(req,res){
        loginSchema.findOne(req.body, function (err, doc){
            if(err){
                console.log("err");
                return res.status(500).send();
            }
            if(!doc){
               return res.status(300).send({"message":"the code is invalid"}) 
            }
            if(doc){
                userSchema.findOne({phone:doc.phone},function(err,user){
                    
                    if(err){
                        return res.status(500).send();
                    }
                    if(user){
                        console.log(user);
                    var newToken=new userToken(true,0,user,user._id);
                    console.log(newToken);
                    return res.status(201).send({token:newToken.token})
                }
                }) 
            }
        })
    }
    return{
        login,
        checkCode
    }
}

module.exports=loginController();