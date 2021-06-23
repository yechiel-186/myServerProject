var express =require('express');
const registerController=require('../controllers/registerController');
const registerRoutes=express.Router();


registerRoutes.post('/checkUserNutExits',registerController.checkUserNutExits);
registerRoutes.post('/checkCode',registerController.checkCode);
registerRoutes.post('/ImageAuthentication',registerController.ImageAuthentication);
module.exports=registerRoutes;