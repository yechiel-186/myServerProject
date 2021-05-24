var express =require('express');

const userController=require('../controllers/userController');
const userRoutes=express.Router();

userRoutes.post('/create',userController.create);
userRoutes.get('/getAll', userController.getAll);
userRoutes.get('/:_id', userController.getUser);
userRoutes.delete('/:_id', userController.deleteUser);
module.exports=userRoutes;