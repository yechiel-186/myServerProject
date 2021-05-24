const userSchema = require("../mySchema/userSchema");
const loginSchema = require("../mySchema/loginSchema");
function loginController(){
    function checkUser(req,res){
        
    userSchema.findOne({id:req.body.id},function(err,user){
        if(err){
            console.log("err");
            res.status(404).send();
        }
        if(user){
            return res.status(200).send("uyjgf");
        }
        if(!user){
            var userLogin=new loginSchema({id:req.body.id,code:"1234"});
            userLogin.save();
            req.body._id=userLogin._id;            
        return res.status(300).send(req.body);
        }
          
    } ) 
}

function checkCode(req,res){
    loginSchema.findOne(req.body, function(err,user){
        if(err){
            console.log("err");
            res.status(404).send();  
        }
        if(!user){
            return res.status(404).send("no access")
        }
        if(user){
            loginSchema.updateOne(req.body,{$set:{Verified:true}})
            return res.status(200).send("Verified code")
        }
    })
}

function ImageAuthentication(req,res){
    if(true){
        var newUser=userSchema(req.body);
        newUser.save(function (arr, user){
            if(arr){
                return res.status(404).send("")
            }
            return res.status(201).send("user Registered successfully");
        });
    }
}

    return {
        checkUser,
        checkCode,
        ImageAuthentication
    }    
}
module.exports=loginController();