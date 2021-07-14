const internSchema = require("../models/internSchema");
const userSchema = require("../models/userSchema");
const academic=require('../models/academicScema');
const test =require('../models/testSchema');


function userController(){
    function getQuesitnners(req,res){
        internSchema.findById(req.user._ids,function(err,intern1){
            error(err,res);
            if(!intern1){
                console.log("no user");
            }
       res.status(200).send(intern1)
    }   
        )}


      function updateQuesitnners(req,res){
        internSchema.findById(req.user._ids,function(err,intern1){
            error(err,res);
           intern1.overwrite(req.body).save(function(err,intern2){
            error(err,res);
            intern2.save(function(err,intern3){
                error(err,res);
                academic.findOne({fullName:intern3.academic},function(err,academic2){
                    error(err,res);
                    academic2.interns.push(req.user._id)
                    academic2.save(function(err,academic3){
                        error(err,res);
                        res.status(200).send({"message":"update" , "obj":intern3})
                    })
                })
            })
           })          
        })
      }


      function postTestAnswers(req,res){
        userSchema.findOne({_id:req.user._id},function(err,user1){
            error(err,res)
            user1.populate('typeUser',function(err,user2){
                error(err,res)
            newTest=new test(req.body)
                
            newTest.intern=user2;
            newTest.save(function(err,test1){
                error(err,res)
                user2.typeUser.testAnswers.push(test1);
                user2.typeUser.save(function(err,user3){
                    error(err,res);
                })
            })
            })
        })
    }

function getAllTests(req,res){
    userSchema.findOne({_id:req.user._id},function(err,user1){
        error(err,res)
       test.find({intern:req.user._id},function(err,allTest1){
        error(err,res)
        res.status(201).send(allTest1)
        console.log(allTest1);
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
        postTestAnswers,
        getAllTests
        
    }
}
module.exports=userController();