var express =require('express');
const supervisorController=require('../controllers/supervisorController')
const supervisorRouts=express.Router();

supervisorRouts.use('/verify',function(req,res,next){
    console.log(req.user);
    if(req.user.roleNumber>=200)
    return next()
    res.status(500).send({"message":"You dont have access permission"})
})
supervisorRouts.post('/verify/loginSupervisorEndCreateIntern',supervisorController.loginSupervisorEndCreateIntern)
supervisorRouts.get('/verify/getInterns', supervisorController.getInterns)
supervisorRouts.get('/verify/getAllInternsAcademic',supervisorController.getAllInternsAcademic)

module.exports=supervisorRouts;