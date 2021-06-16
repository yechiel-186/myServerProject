var express =require('express');
const loginController=require('../controllers/loginController');
const loginRouts=express.Router();

loginRouts.get('/:ID',loginController.loginIntern);
loginRouts.post('/checkCode',loginController.checkCode)

module.exports=loginRouts;