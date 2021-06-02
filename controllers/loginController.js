const userSchema = require("../models/userSchema");
const loginSchema = require("../models/loginSchema");
const userToken = require("../models/userToken");
function loginController(){
    function checkUserNutExits(req,res){
        //בדיקה האם משתמש לא קיים 
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
            var userLogin=new loginSchema({code:code});
            userLogin.save( function (err, doc){
                if(err){
                    return res.status(404).send()}          
        return res.status(200).send({_id:doc._id})});    
        }          
    } ) 
}

function checkCode(req,res){
            loginSchema.updateOne({_id:req.body._id,code:req.body.code},{$set:{Verified:true}},function(err, result){
                if(err){
                    console.log("456");
                    return res.status(404).send();  
                }
                if(!result.n){
                    console.log("789");
                    return res.status(403).send()
                }
                console.log("1000");
                res.status(200).send({_id:req.body._id})
            })
        }
   

function ImageAuthentication(req,res){
    loginSchema.findOne({_id:req.body.auth._id,Verified:true},function(err,user){
         if(err){
                return res.status(404).send("")
            }
            if(!user){
                return res.status(403).send("no accses")
            }
            if(true){
                userSchema.findOne({ID:req.body.user.ID},function(err,user){
                    if(err){
                        res.status(303).send();
                        console.log("ikjhue");
                    }
                    if(!user){
                var newUser=new userSchema(req.body.user);
                newUser.save(function(err,user){
                    if(err){
                        res.status(303).send("err")
                    }
                    var newUserToken= new userToken(true,0,req.body.user);
                
                return res.status(201).send({token:newUserToken.token});
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
module.exports=loginController();