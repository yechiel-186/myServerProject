const userSchema = require("../models/userSchema");
const loginSchema = require("../models/loginSchema");
const userToken = require("../models/userToken");
const intern=require("../models/internSchema")
function registerController(){
    function checkUserNutExits(req,res){
    userSchema.findOne({ID:req.body.ID},function(err,user){
        error(err,res);
        if(user){
            console.log("user");
            return res.status(401).send({"message":"user exsits"}); 
        }
        else{
            var code="1234";
            var userLogin=new loginSchema({code:code,phone:req.body.phone}); 
            userLogin.save( function (err, doc){
                error(err,res);        
        return res.status(200).send({_id:doc._id})});    
        }          
    } ) 
}

function checkCode(req,res){
           loginSchema.updateOne({_id:req.body._id,code:req.body.code},{$set:{verified:true}},function(err, result){
            error(err,res);
                if(!result.n){
                    return res.status(403).send({"message":"dont have in DB this _id"})
                }
                res.status(200).send()
            })
        }
   

function ImageAuthentication(req,res){
    loginSchema.findOne({_id:req.body.user._id,phone:req.body.intern.phone,verified:true},function(err,userLogin){
        error(err,res);
            if(!userLogin){
                return res.status(403).send("no accses")
            }
            if(true){
                userSchema.findOne({ID:req.body.intern.ID},function(err,user){
                    error(err,res);
                    if(!user){
                        req.body.intern.role="intern";
                        req.body.intern.roleNumber=100;
                var newUser=new userSchema(req.body.intern);
                newUser.save(function(err,result){
                    error(err,res);
                    if(result){
                        console.log("is", result);
                        var newIntern=new intern();
                        newIntern.save(function(err,end){;
                            error(err,res);
                            result.typeUser=end;
                            result.save();
                        var newUserToken= new userToken(true,0,result,end._id);                       
                        return res.status(201).send({token:newUserToken.token,user:result});
                        })
                    } 
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

    

    return {
        checkUserNutExits,
        checkCode,
        ImageAuthentication
    }    
}
module.exports=registerController();
