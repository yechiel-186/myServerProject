const user=require("../models/userSchema")
const supervisor=require("../models/supervisorSchema");
const admin=require("../models/adminSchema")
const userToken=require("../models/userToken")
const academic=require('../models/academicScema');


function adminController(){
    function createAdmin(req,res){
        user.findOne({ID:req.body.ID},function(err,user1){
            error(err,res);
            if(user1){
                return res.status(400).send({"message":"you are registed"})
            }
            var newAdmin=new admin({password:req.body.password})
            newAdmin.save(function(err,middle){
                error(err,res);
            req.body.roleNumber=500;
            req.body.role="admin";
            req.body.phone=Date.now();
            var newUser=new user(req.body)
            newUser.typeUser=middle;
            newUser.save(function(err,result){
                error(err,res);  
            var newUserToken= new userToken(true,0,result,result._id);                       
            res.status(201).send({token:newUserToken.token});

        })
        })    
            })
            
    }
    function loginAdmin(req,res){
        user.findOne({ID:req.body.ID},function(err,user1){
            error(err,res);
            user1.populate('typeUser',function(err,user2){
                console.log(user2);
                error(err,res);
                if(user2.typeUser.password!=req.body.password){
                    return res.status(400).send({"message":"password is not true"})
                }
                var newUserToken= new userToken(true,0,user1,user1._id);                       
            res.status(201).send({token:newUserToken.token});
            })
        })
    }

    function createSupervisor(req,res){
        user.findOne({ID:req.user.ID},function(err,admin1){
            error(err,res);
                if(!admin1){
                    return res.status(500).send({"message":"no access"})
                }
                var usernwe=req.body;
                user.findOne({ID:usernwe.ID},function(err,user1){
                    error(err,res);
                        if(user1){
                    return res.status(300).send({"message":"this supervisor is created"})
                        }
                        req.body.role="supervisor";
                        req.body.roleNumber=200;
                        var newuser=new user(req.body);
                        newuser.save(function(err,user2){
                            error(err,res);
                            var newSupervisor=new supervisor()
                            newSupervisor.save(function(err,supervisor2){
                                error(err,res);
                                user2.typeUser=supervisor2
                                user2.save()

                            })

                        })










                academic.findOne({fullName:req.body.academic},function(err,academic1){
                    console.log(academic1, "academic1");
                    error(err,res);
                    var newSupervisor=new supervisor();
                    newSupervisor.save(function(err,supervisor1){
                        console.log(supervisor1, "supervisor1");
                        error(err,res);
                        
                        var newUser=new user(req.body);
                        newUser.save(function(err,newuser1){
                            console.log(newuser1, "newuser1");
                            error(err,res);
                            newuser1.typeUser=supervisor1;
                            newuser1.typeUser.save(function(err,newuser2){
                                console.log(newuser2, "newuser2");
                                error(err,res);
                            newuser2.academic=academic1;
                            newuser2.academic.save(function(err,academic2){
                                console.log(academic2, "academic2");
                                error(err,res);
                            
                            academic2.supervisors.push(supervisor1)

                                academic2.save(function(err,academic3){
                                    console.log(academic3);
                                    error(err,res);

                               
                                res.status(201).send({"message":"supervisor create"})
                            })
                         })
                         })
                          })
                        }) 
                    })
                })
            })
        }



       


    function createAcademic(req,res){
        user.findById(req.user._id,function(err,level1){
            error(err,res);
            academic.findOne(req.body,function(err,level2){
                console.log("level2", level2);
                error(err,res);
            if(level2){
                return res.status(300).send()
            }
            var newAcademic=new academic(req.body);
            console.log("newacademic", newAcademic);
            newAcademic.save(function(err,level3){
                error(err,res);
                console.log("level3", level3);

                level1.populate('typeUser',function(err,level4){
                    error(err,res);

                level4.typeUser.academics.push(level3);
                level1.typeUser.save();
                
                res.status(201).send({"message":"new academic is created"})
            })
            })
    })}
        )}
            function getAcademic(req,res){
                user.findById(req.user._id).populate({path:'typeUser',populate:{path:'academics', select:'fullName -_id' }}).exec(function(err,result){
                    error(err,res);
                    var arr=result.typeUser.academics.map(a=>a.fullName);
                    console.log(arr,"admin");
                    res.status(200).send(arr)
                });
                
            }

            function error(err,res){
                if(err){
                    res.status(500).send(err)
                }
            }

    return{
        createAdmin,
        loginAdmin,
        createSupervisor,
        createAcademic,
        getAcademic
    }

}

module.exports=adminController()