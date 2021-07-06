const userSchema = require("../models/userSchema");
const loginSchema = require("../models/loginSchema");
const userToken = require("../models/userToken");
const intern=require("../models/internSchema")
function registerController(){
    function checkUserNutExits(req,res){
    userSchema.findOne({ID:req.body.ID},function(err,user){
        if(err){
            console.log("err");
            return res.status(500).send();
        }
        if(user){
            console.log("user");
            return res.status(401).send({"message":"user exsits"}); 
        }
        else{
            var code="1234";
            var userLogin=new loginSchema({code:code,phone:req.body.phone}); 
            userLogin.save( function (err, doc){
                if(err){
                    return res.status(404).send()}          
        return res.status(200).send({_id:doc._id})});    
        }          
    } ) 
}

function checkCode(req,res){
           loginSchema.updateOne({_id:req.body._id,code:req.body.code},{$set:{verified:true}},function(err, result){
                if(err){
                    console.log("456");
                    return res.status(404).send(err); 
                }
                if(!result.n){
                    return res.status(403).send({"message":"dont have in DB this _id"})
                }
                console.log("1000");
                res.status(200).send()
            })
        }
   

function ImageAuthentication(req,res){
    loginSchema.findOne({_id:req.body.user._id,phone:req.body.intern.phone,verified:true},function(err,userLogin){
         if(err){
                return res.status(404).send("")
            }
            if(!userLogin){
                return res.status(403).send("no accses")
            }
            if(true){
                userSchema.findOne({ID:req.body.intern.ID},function(err,user){
                    if(err){
                        console.log("ikjhue");
                        return res.status(303).send();   
                    }
                    if(!user){
                        req.body.intern.role="intern";
                        req.body.intern.roleNumber=100;
                var newUser=new userSchema(req.body.intern);
                newUser.save(function(err,result){
                    if(err){
                        console.log(err);
                         res.status(500).send(err)
                    }if(result){
                        console.log("is", result);
                        var newIntern=new intern();
                        newIntern.save(function(err,end){
                            console.log(end);
                            if(err){
                                return res.status(303).send()
                            }
                            result.typeUser=end;
                            result.save();
                            console.log(result);
                        var newUserToken= new userToken(true,0,result,result._id);                       
                        return res.status(201).send({token:newUserToken.token,user:result});
                        })
                    } 
                })
                    }
                })    
            }
    })
    }
    

    return {
        checkUserNutExits,
        checkCode,
        ImageAuthentication
    }    
}
module.exports=registerController();
