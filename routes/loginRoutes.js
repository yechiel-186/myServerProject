var express =require('express');
const loginController=require('../controllers/loginController');
const loginRoutes=express.Router();

loginRoutes.post('/checkUserNutExits',loginController.checkUserNutExits);
loginRoutes.post('/checkCode',loginController.checkCode);
loginRoutes.post('/ImageAuthentication',loginController.ImageAuthentication);
module.exports=loginRoutes;