const user=require('../models/userSchema')
const intern=require('../models/internSchema')

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
    return{
        loginSupervisorEndCreateIntern
    }
}

module.exports=supervisorController();