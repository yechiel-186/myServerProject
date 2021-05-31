var express =require('express');
const dataController=require('../controllers/dataController');
const dataRouts=express.Router();

dataRouts.post('/data',dataController)
module.exports=dataRouts;