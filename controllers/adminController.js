const user=require("../models/userSchema")
const supervisor=require("../models/supervisorSchema");
const admin=require("../models/adminSchema")
const userToken=require("../models/userToken")
const academic=require('../models/academicScema')

function adminController(){
    function createAdmin(req,res){
        user.findOne({ID:req.body.ID},function(err,user1){
            if(err){
                console.log("1");
                return res.status(500).send(err)
            }
            if(user1){
                console.log("2");
                return res.status(400).send("you are registed")
            }
            req.body.roleNumber=500;
            req.body.role="admin";
            req.body.phone=Date.now();
            var newUser=new user(req.body)
            newUser.save(function(err,middle){
                console.log(err);
                if(err){
                    console.log("4");
                    return res.status(500).send(err)
                }
               var newAdmin=new admin({password:req.body.assword,user:newUser._id})
        newAdmin.save(function(err,result){
            console.log("5");
            console.log(result);
            if(err){
                return res.status(500).send(err)
            }
            var newUserToken= new userToken(true,0,result,result._id);                       
            res.status(201).send({token:newUserToken.token});
        })
        })    
            })
            
    }

    function createSupervisor(req,res){
        admin.findOne({ID:req.params.ID},function(err,level1){
            if(err){
                return res.status(500).send()
            }
            req.body.role="supervisor";
            req.body.roleNumber=200;
            var newUser2=new user(req.body);
            newUser2.save(function(err,level2){
                if(err){
                    return res.status(500).send()
                }
                
                var newSupervisor=new supervisor({user:newUser2._id});
            newSupervisor.save(function(err,level2){
                if(err){
                    return res.status(500).send()
                }
                res.status(201).send("new supervisor is created")
            })
        })

            })
            
        
    }



    function createAcademic(req,res){
        admin.findOne({ID:req.params.ID},function(err,level1){
            if(err){
                return res.status(500).send()
            }
            var newAcademic=new academic(req.body);
            newAcademic.save(function(err,level1){
                if(err){
                    return res.status(500).send()
                }
                res.status(201).send("new academic is created")
            })
    })}

    function getAcademic(req,res){
        academic.find(function(err,arrey){
            if(err){
                return res.status(500).send()
            }
            res.status(200).send(arrey)
        })
    }

    return{
        createAdmin,
        createSupervisor,
        createAcademic,
        getAcademic
    }

}

module.exports=adminController()