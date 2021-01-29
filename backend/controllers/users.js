const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');
const jwtHelper = require('../config/jwtHelper')
const lodash = require('lodash');

const router = express.Router();
const Users = require('../database/models/users');
const { route } = require('./categories');


router.get('/',jwtHelper.verifyJwtToken,(req, res) => {
    Users.findOne({_id:req._id},(err, user) => {
        if(!user) res.status(404).json({status:false, message:"user record not found"});
        else res.status(200).json({status:true, user:lodash.pick(user,['username'])})
    });
});

router.post('/signup', (req,res)=>{
    Users.find({"username":req.body.username},(err,user)=>{
        if(err){res.status(500).send();return}
        if(user.length){res.status(500).send("user exist..");return}
        try{
            const salt = bcrypt.genSaltSync();
            const hashedPass = bcrypt.hashSync(req.body.password,salt);
            (new Users({ 'username': req.body.username, 'password': hashedPass }))
                .save()
                .then((newuser) => res.send("User account created"))
                .catch((error) => console.log("error occured.. :" + error))
        }
        catch(error){
            res.status(500).send();
        }
    })
    

    
});

router.post('/login', (req,res)=>{
    passport.authenticate('local',(err,user,info)=>{
        if(err) return res.status(400).json(err);
        else if(user) return res.status(200).json({"token": user.generateJwt(user._id)});
        else res.status(404).json(info);
    })(req,res)
    // Users.find({"username":req.body.username},(err,user)=>{
    //     if(err){res.status(500).send();return}
    //     if(!user.length){res.status(500).send();return}
    //     try{
    //         if(bcrypt.compareSync(req.body.password,user[0].password)){
    //             res.send("User is a valid user");
    //         }else{
    //             res.status(500).send("not a valid user");
    //         }
    //     }
    //     catch(err){
    //         res.status(500).send();
    //     }
    // })
});

module.exports = router;
