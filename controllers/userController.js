const userSchema = require("../mySchema/userSchema");

function userController(){
    function create(req,res){
        var newUser=new userSchema(req.body);
       
           newUser.save();
           res.status(201).send("the test is true");
           console.log(req.body);
}


    function getAll(req,res){
        console.log("getAll");
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
        deleteUser
        
    }
}
module.exports=userController();