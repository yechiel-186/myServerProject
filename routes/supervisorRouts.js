var express =require('express');
const supervisorController=require('../controllers/supervisorController')
const supervisorRouts=express.Router();

supervisorRouts.use('/api/verify',function(req,res,next){
    if(req.user.roleNumber>=200)
    return next()
    res.status(500).send({"message":"You dont have access permission"})
})
supervisorRouts.post('/api/verify/loginSupervisorEndCreateIntern',supervisorController.loginSupervisorEndCreateIntern)

module.exports=supervisorRouts;