const userSchema = require("../models/userSchema");

function userController(){
    function create(req,res){
        var newUser=new userSchema(req.body);
       
           newUser.save();
           res.status(201).send("the test is true");
           console.log(req.body);
}

    function getQuesitnners(req,res){
        userSchema.findOne({ID:req.user.ID},function(err,user){
            console.log(req.user.ID);
            if(err){
               return res.status(401).send();
            }
            if(!user){
                console.log("no user");
            }
           
        return res.status(201).send({user})}
        )}

      function updateQuesitnners(req,res){
          console.log('up work');
          userSchema.updateOne({_id:req.user._id},req.body,{new:true},function(err,result){
              console.log(req.body);
              if(err){
                  console.log(err);
                  return res.status(401).send()
              }if(result){
                    console.log(result);
              return res.status(200).send({"message":"update"})}
              
          })
          
      }

    function getAll(req,res){
        userSchema.find(function(err,list){
            if(err){
                return res.status(403).send()
            }if(list){
                return res.status(202).send(list)
            }
        })
    }

    function getUser(req,res){
        console.log("getUser");
    }

    function deleteUser(req,res){
        console.log("delete");
    }


    return{
        create,
        getAll,
        getUser,
        deleteUser,
        getQuesitnners,
        updateQuesitnners,
        getAll
        
    }
}
module.exports=userController();