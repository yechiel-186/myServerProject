const internSchema = require("../models/internSchema");
const userSchema = require("../models/userSchema");
const academic=require('../models/academicScema')

function userController(){
    function getQuesitnners(req,res){
        userSchema.findOne({ID:req.user.ID},function(err,user){
            console.log(req.user.ID);
            if(err){
               return res.status(401).send();
            }
            if(!user){
                console.log("no user");
            }
        user.populate('typeUser',function(err,result){
            if(err){
                return res.status(401).send();
            }
                res.status(200).send(result.typeUser)
        })    
    }   
        )}
      function updateQuesitnners(req,res){
          console.log('up work');
          userSchema.findById(req.user._id,function(err,user){
              console.log(req.body);
              if(err){
                  console.log("err1");
                  return res.status(500).send()
              }if(user){
                    console.log(user);
                    user.populate('typeUser',function(err,middle)
                    {
                        if(err){
                            console.log("err2");
                            return res.status(500).send()
                        }
                        middle.typeUser.overwrite(req.body).save(function(err,result){
                            if(err){
                                console.log("err3");
                                return res.status(500).send()
                                
                            }
                            console.log(result, "this");
                             res.status(200).send({"message":"update" , "obj":result})
                        })
                    })
              
            }
              
          })
          
      }
function getAllAcademics(req,res){
     console.log("app");
    academic.find(function(err,result){
        if(err){
            return res.status(500).send()
    }
    console.log(result.fullName);
    res.status(200).send(result.fullName)
})
}
    function getAll(req,res){
       
        userSchema.find(function(err,list){
            if(err){
                return res.status(403).send()
            }if(list){
                return res.status(202).send(list)
            }
        })
    }

    function getUser(req,res){
        console.log("getUser");
    }

    function deleteUser(req,res){
        console.log("delete");
    }


    return{
        getAll,
        getUser,
        deleteUser,
        getQuesitnners,
        updateQuesitnners,
        getAll,
        getAllAcademics
        
    }
}
module.exports=userController();