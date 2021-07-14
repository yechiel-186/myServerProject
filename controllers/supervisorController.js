const user=require('../models/userSchema')
const intern=require('../models/internSchema')
const test=require('../models/testSchema')
const supervisor=require('../models/supervisorSchema');
const academicScema = require('../models/academicScema');

function supervisorController(){
    function loginSupervisorEndCreateIntern(req,res){
        console.log(req.body);
        user.findById(req.user._id,function(err,user1){
            if(err){
                return res.status(500).send()
            }
            if(user1){
                user.findOne({ID:req.body.ID},function(err,user2){
                    if(err){
                        return res.statut(500).send()
                    }
                    if(user2){
                        return res.status(500).send({"message":"this intern is created do you want update data for this intern?"})
                    }
                    var neWuser=new user(req.body)
                    neWuser.save(function (err, user3){
                        if(err){
                           return res.statut(500).send()
                        }
                        req.body.role='intern';
                        req.body.roleNumber=100;
                    var newIntern=new intern(req.body)
                    newIntern.save(function (err, user4){
                        if(err){
                            return res.statut(500).send()
                        }
                        user3.typeUser=user4;
                        user3.typeUser.save();
                        user1.populate('typeUser',function(err,user5){
                            if(err){
                                return res.statut(500).send()
                            }
                            user5.interns.push(user4)
                            console.log(user5);
                            res.status(200).send();
                        })
                        })
                    })
                })
            }
        })
    }
    function getInterns(req,res){

        supervisor.findById(req.user._ids,{select:'interns'}).exec(function(err,user2){
            if(err){
                return res.status(500).send()
            }
            console.log(user2);
            res.status(200).send(user2.interns);
        })
        
    }

    //  can

    function getAllInternsAcademic(req,res){

        supervisor.findById(req.user._ids).populate({path:'academic',populate:{path:'interns'}}).exec(function(err,academic2){
            
            if(err){
                return res.status(500).send()
            }
            // academic2.populate('interns',function(err,academic3){
            //     if(err){
            //         return res.status(500).send()
            //     }
                console.log(academic2);
                res.status(200).send(academic2.interns);
            //})
        })


        // user.findById(req.user._id).populate({path:'typeUser',populate:{path:'supervisor',populate:{path:'academic',populate:{path:'interns'}}}}).exec(function(err,user){
        //     console.log(user);
        // })
        
    }




    function addInterns(req,res){
        user.findById(req.user._id).populate({path:'typeUser', select:'interns'}).exec(function(err,user2){
            if(err){
                return res.status(500).send()
            }
            user2.typeUser.interns.push(req.body._id)
            res.status(200).send(user2.typeUser.interns);
        })
    }



    function createTest(req,res){
        console.log(req.body);
        supervisor.findById(req.user._ids,function(err,user1){
            var newTest=new test(req.body)
            newTest.supervisor=req.user.fullName;
            newTest.save(function(err,test2){
                if(err){
                    return res.status(500).send()
                }
                user1.tests.push(test2)
                    user1.save()
                    res.status(200).send({"message":"new test created"})
           
            })
        })
    }



    return{
        loginSupervisorEndCreateIntern,
        getInterns,
        addInterns,
        getAllInternsAcademic,
        createTest
    }
}

module.exports=supervisorController();