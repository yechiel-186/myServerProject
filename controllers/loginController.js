const userSchema = require("../models/userSchema");
const loginSchema = require("../models/loginSchema");
const useToken = require("../models/userToken");
function loginController(){
    function checkUserNutExits(req,res){
        //בדיקה האם משתמש לא קיים 
    userSchema.findOne({ID_number:req.body.ID_number},function(err,user){
        if(err){
            console.log("err");
            return res.status(500).send();
        }
        if(user){
            console.log("user");
            return res.status(200).send("user exsits"); 
        }
        if(!user){
            var userLogin=new loginSchema({code:"1234"});
            userLogin.save( function (err, doc){
                if(err){
                    return res.status(404).send()}          
        return res.status(200).send({_id:doc._id})});    
        }          
    } ) 
}

function checkCode(req,res){
    // loginSchema.findOne(req.body._id, function(err,user){
        // if(err){
        //     console.log("err");
        //     res.status(404).send();  
        // }
        // if(!user){
        //     return res.status(404).send("no access")
        // }
        // if(user){
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
    
    if(true){
        var newUser=userSchema(req.body);
        var newUserToken= useToken(true,0,req.body.fullName,req.body.ID_number,req.body.role,req.body.roleNumber,req.body.email);
        console.log(newUserToken.token);
        newUser.save(function (err, user){
            if(err){
                return res.status(404).send("")
            }
            return res.status(201).send();
        });
    }
}

    return {
        checkUserNutExits,
        checkCode,
        ImageAuthentication
    }    
}
module.exports=loginController();