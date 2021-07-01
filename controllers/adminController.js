const user=require("../models/userSchema")
const supervisor=require("../models/supervisorSchema");
const admin=require("../models/adminSchema")
const userToken=require("../models/userToken")
const academic=require('../models/academicScema');


function adminController(){
    function createAdmin(req,res){
        user.findOne({ID:req.body.ID},function(err,user1){
            if(err){
                console.log("1");
                return res.status(500).send(err)
            }
            if(user1){
                console.log("2");
                return res.status(400).send({"message":"you are registed"})
            }
            var newAdmin=new admin({password:req.body.password})
            newAdmin.save(function(err,middle){
                console.log("5");
                console.log(middle);
                if(err){
                    return res.status(500).send(err)
                }
            req.body.roleNumber=500;
            req.body.role="admin";
            req.body.phone=Date.now();
            var newUser=new user(req.body)
            newUser.typeUser=middle;
            console.log(newUser);
            newUser.save(function(err,result){
                if(err){
                    console.log("4");
                    return res.status(500).send(err)
                }   
            var newUserToken= new userToken(true,0,result,result._id);                       
            res.status(201).send({token:newUserToken.token});

        })
        })    
            })
            
    }
    function loginAdmin(req,res){
        user.findOne({ID:req.body.ID},function(err,user1){
            if(err){
                return res.status(500).send()  
            }
            user1.populate('typeUser',function(err,user2){
                console.log(user2);
                if(err){
                    return res.status(500).send()  
                }
                if(user2.typeUser.password!=req.body.password){
                    return res.status(400).send({"message":"password is not true"})
                }
                var newUserToken= new userToken(true,0,user1,user1._id);                       
            res.status(201).send({token:newUserToken.token});
            })
        })
    }

    function createSupervisor(req,res){
        user.findOne({ID:req.user.ID},function(err,level1){
                if(err){
                    return res.status(500).send()
                }
                if(!level1){
                    return res.status(500).send({"message":"no access"})
                }
                user.findOne({ID:req.body.ID},function(err,level2){
                        if(err){
                            return res.status(500).send()
                        }
                        if(level2){
                    return res.status(300).send({"message":"this supervisor is created"})
                        }
                academic.findOne({fullName:req.body.academic},function(err,level3){
                    console.log(req.body.academic);
                    if(err){
                        return res.status(500).send()
                    }
                    var newSupervisor=new supervisor();
                    newSupervisor.save(function(err,level4){
                        if(err){
                            return res.status(500).send()
                        }
                        req.body.role="supervisor";
                        req.body.roleNumber=200;
                        var newUser=new user(req.body);
                        newUser.save(function(err,level5){
                            if(err){
                                console.log("test");
                                return res.status(500).send()
                            }
                            level5.typeUser=level4;
                            level5.typeUser.save(function(err,level6){
                                if(err){
                                    return res.status(500).send()
                                }
                            })
                            level4.academic=level3;
                            level4.save()
                            console.log(level3);
                            level3.supervisors.push(level4)
                                level3.save()
                                res.status(201).send({"message":"supervisor create"})
                            })
                        }) 
                    })
                })
            })
        }



       


    function createAcademic(req,res){
        user.findById(req.user._id,function(err,level1){
            if(err){
                return res.status(500).send()
            }
            academic.findOne(req.body,function(err,level2){
                console.log("level2", level2);
            if(err){
                return res.status(500).send()
            }
            if(level2){
                return res.status(300).send()
            }
            var newAcademic=new academic(req.body);
            console.log("newacademic", newAcademic);
            newAcademic.save(function(err,level3){
                if(err){
                    return res.status(500).send()
                }
                console.log("level3", level3);

                level1.populate('typeUser',function(err,level4){
                if(err){
                        return res.status(500).send()
                }

                level4.typeUser.academics.push(level3);
                level1.typeUser.save();
                
                res.status(201).send({"message":"new academic is created"})
            })
            })
    })}
        )}
            function getAcademic(req,res){
                user.findById(req.user._id).populate({path:'typeUser',populate:{path:'academics', select:'fullName -_id' }}).exec(function(err,result){
                    if(err){
                        return res.status(500).send()
                    }
                    var arr=result.typeUser.academics.map(a=>a.fullName);
                    
                    res.status(200).send(arr)
                });
                
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