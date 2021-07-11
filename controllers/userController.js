const internSchema = require("../models/internSchema");
const userSchema = require("../models/userSchema");
const academic=require('../models/academicScema');
const test =require('../models/testSchema');


function userController(){
    function getQuesitnners(req,res){
        userSchema.findOne({ID:req.user.ID},function(err,user){
            error(err,res);
            if(!user){
                console.log("no user");
            }
        user.populate('typeUser',function(err,result){
            error(err,res);
                res.status(200).send(result.typeUser)
        })    
    }   
        )}


      function updateQuesitnners(req,res){
          console.log('up work');
          userSchema.findById(req.user._id,function(err,user){
              error(err,res);
                if(user){
                    user.populate('typeUser',function(err,middle)
                    {
                        error(err,res);
                        middle.typeUser.overwrite(req.body).save(function(err,result){
                            error(err,res);
                            academic.findOne({fullName:result.academic},function(err,test){
                                error(err,res);
                                test.save()
                            })
                            res.status(200).send({"message":"update" , "obj":result})
                        })
                })
            }
              
          })
          
      }


      function updataTestFile(req,res){
          console.log("זה עובד");
        userSchema.findOne({_id:req.user._id},function(err,user1){
            error(err,res)
            user1.populate('typeUser',function(err,user2){
                error(err,res)
            newTest=new test(req.body.testFile)
            newTest.save(function(err,test1){
                error(err,res)
                user2.typeUser.testPost.push(test1);
                user2.typeUser.save(function(err,user3){
                    error(err,res);
                })
                
            })
            })
        })
    }
function getHoldTest(req,res){
    userSchema.findOne({_id:req.user._id},function(err,user1){
        error(err,res)
        user1.populate('typeUser',function(err,user2){
            error(err,res)
        res.status(200).send(user2.typeUser.testPost)
        })
    })
}


function getAllAcademics(req,res){
     console.log("app");
    academic.find({},{'fullName':1,'_id':0},function(err,result){
        if(err){
            return res.status(500).send()
    }
    
    var arr=result.map(data=>data.fullName)

    console.log(arr);
    res.status(200).send(arr)
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

    function error(err,res){
        if(err){
            res.status(500).send(err)
        }
    }

    return{
        getAll,
        getUser,
        deleteUser,
        getQuesitnners,
        updateQuesitnners,
        getAll,
        getAllAcademics,
        updataTestFile,
        getHoldTest
        
    }
}
module.exports=userController();