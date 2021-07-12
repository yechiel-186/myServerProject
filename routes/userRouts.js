var express =require('express');

const userController=require('../controllers/userController');
const userRoutes=express.Router();

userRoutes.get('/getAllAcademic',userController.getAllAcademics)
userRoutes.get('/getQuesitnners',userController.getQuesitnners);
userRoutes.put('/updateQuesitnners',userController.updateQuesitnners);
userRoutes.post('/postTestAnswers',userController.postTestAnswers);
userRoutes.get('/getAllTests',userController.getAllTests);
userRoutes.get('/all', userController.getAll);
userRoutes.get('/:_id', userController.getUser);
userRoutes.delete('/:_id', userController.deleteUser);
module.exports=userRoutes;