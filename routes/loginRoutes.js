var express =require('express');
const loginController=require('../controllers/loginController');
const loginRoutes=express.Router();

loginRoutes.post('/checkUser',loginController.checkUser);
module.exports=loginRoutes;