var express =require('express');
const adminRouts=express.Router();
const adminController=require("../controllers/adminController.js")
const dataController = require('../controllers/dataController.js');

adminRouts.post('/create',adminController.createAdmin);
adminRouts.post('/api/admin',dataController)
adminRouts.post('/api/createSupervisor',adminController.createSupervisor);
adminRouts.post('/api/createAcademic',adminController.createAcademic);
adminRouts.get('/getacademic',adminController.getAcademic)


module.exports=adminRouts;