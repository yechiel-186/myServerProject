var express =require('express');
const adminRouts=express.Router();

const adminController=require("../controllers/adminController.js")
const dataController = require('../controllers/dataController.js');


adminRouts.post('/createAdmin',adminController.createAdmin);
adminRouts.post('/loginAdmin',adminController.loginAdmin);
adminRouts.use('/api',dataController);
adminRouts.use('/api/verify',function(req,res,next){
    if(req.user.roleNumber>=500)
    return next()
    res.status(500).send({"message":"You dont have access permission"})
})
adminRouts.post('/api/verify/createSupervisor',adminController.createSupervisor);
adminRouts.post('/api/verify/createAcademic',adminController.createAcademic);
adminRouts.get('/api/verify/getacademic',adminController.getAcademic)


module.exports=adminRouts;