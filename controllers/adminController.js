const user = require("../models/userSchema")
const supervisor = require("../models/supervisorSchema");
const admin = require("../models/adminSchema")
const userToken = require("../models/userToken")
const academic = require('../models/academicScema');


function adminController() {
    function createAdmin(req, res) {
        user.findOne({ ID: req.body.ID }, function (err, user1) {
            error(err, res);
            if (user1) {
                return res.status(400).send({ "message": "you are registed" })
            }
            var newAdmin = new admin({ password: req.body.password })
            newAdmin.save(function (err, middle) {
                error(err, res);
                req.body.roleNumber = 500;
                req.body.role = "admin";
                req.body.phone = Date.now();
                var newUser = new user(req.body)
                newUser.typeUser = middle;
                newUser.save(function (err, result) {
                    error(err, res);
                    var newUserToken = new userToken(true, 0, result, result.typeUser._id);
                    academic.find(function (err, allAcademics) {
                        error(err, res);
                        var arr = allAcademics.map(a => a.fullName);
                        res.status(201).send({ token: newUserToken.token, academicsList: arr });
                    })
                })
            })
        })
    }

    function loginAdmin(req, res) {
        user.findOne({ ID: req.body.ID }, function (err, user1) {
            error(err, res);
            user1.populate('typeUser', function (err, user2) {
                console.log(user2);
                error(err, res);
                if (user2.typeUser.password != req.body.password) {
                    return res.status(400).send({ "message": "password is not true" })
                }
                var newUserToken = new userToken(true, 0, user1, user1.typeUser._id);
                academic.find(function (err, allAcademics) {
                    error(err, res);
                    console.log(allAcademics);
                    var arr = allAcademics.map(a => a.fullName);
                    console.log(arr);
                    res.status(201).send({ token: newUserToken.token, academicsList: arr });
                })
            })
        })
    }


    function createSupervisor(req, res) {
        console.log(req.body);
        admin.findById(req.user._ids,function(err,admin1){
            if (!admin1) {
                return res.status(500).send({ "message": "no access" })
    }   
            var nowUser = req.body;
            user.findOne({ ID: nowUser.ID }, function (err, step1) {
              
                error(err, res);
                if (step1) {
                    return res.status(300).send({ "message": "this supervisor is created" })
                }
                nowUser.role = 'supervisor';
                nowUser.roleNumber = 200;
                var newUser = new user(nowUser)
                console.log("nowUser");
                newUser.save(function (err, step2) {
                    error(err, res);
                    var newsupervisor = new supervisor();
                    newsupervisor.save(function (err, supervisor2) {
                        error(err, res);
                        step2.typeUser = supervisor2;
                        step2.save(function (err, step3) {
                            error(err, res);
                            academic.findOne({ fullName: nowUser.academic }, function (err, academic2) {
                                console.log(academic2);
                                error(err, res);
                                academic2.supervisors.push(supervisor2)
                                academic2.save(function (err, academic3) {
                                    error(err, res);
                                    console.log(academic3);
                                    res.status(201).send({ "message": "supervisor create" })

                                })


                            })

                        })

                    })
                })
            })
        })


    }


    function createAcademic(req, res) {
        console.log(req.body);
        admin.findById(req.user._ids, function (err, level1) {
            error(err, res);
            academic.findOne(req.body, function (err, level2) {
                console.log("level2", level2);
                error(err, res);
                if (level2) {
                    return res.status(300).send()
                }
                var newAcademic = new academic(req.body);
                console.log("newacademic", newAcademic);
                newAcademic.save(function (err, level3) {
                    error(err, res);
                    console.log("level3", level3);
                    level1.academics.push(level3)
                   level1.save(function (err, level3) {
                    error(err, res);
                        res.status(201).send({ "message": "new academic is created", "obj":level3 })
                    })
                })
            })
        }
        )
    }
    

    function error(err, res) {
        if (err) {
            res.status(500).send(err)
        }
    }

    return {
        createAdmin,
        loginAdmin,
        createSupervisor,
        createAcademic
    }

}

module.exports = adminController()