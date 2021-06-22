var express =require('express');

const userController=require('../controllers/userController');
const userRoutes=express.Router();


userRoutes.get('/getQuesitnners',userController.getQuesitnners);
userRoutes.put('/updateQuesitnners',userController.updateQuesitnners);
userRoutes.get('/all', userController.getAll);
userRoutes.get('/:_id', userController.getUser);
userRoutes.delete('/:_id', userController.deleteUser);
module.exports=userRoutes;