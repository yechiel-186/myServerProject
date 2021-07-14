const loginSchema = require("../models/loginSchema");
const userSchema=require("../models/userSchema");
const userToken = require("../models/userToken");
 
function loginController(){
    function login(req,res){
        userSchema.findOne({ID:req.params.ID},function(err,user){
            error(err,res);
            if(!user){
                console.log("not user");
                return res.status(401).send({"message":"dont have a intern by this ID"}); 
            }
            else{
                var code="1234";
            var userLogin=new loginSchema({code:code,phone:user.phone}); 
            userLogin.save( function (err, doc){
                error(err,res);
        return res.status(200).send({_id:doc._id})});    
            }          
        } ) 
    }
    
    function checkCode(req,res){
        loginSchema.findOne(req.body, function (err, doc){
            error(err,res);
            if(!doc){
               return res.status(300).send({"message":"the code is invalid"}) 
            }
            if(doc){
                userSchema.findOne({phone:doc.phone},function(err,user){
                    error(err,res);
                    if(user){
                        user.populate('typeUser',function(err,user2){
                            error(err,res);
                            var newToken=new userToken(true,0,user,user2.typeUser._id);
                            return res.status(201).send({token:newToken.token, user:user})
                        })
                }
                }) 
            }
        })
    }

    function error(err,res){
        if(err){
            res.status(500).send(err)
        }
    }
    return{
        login,
        checkCode
    }
}

module.exports=loginController();