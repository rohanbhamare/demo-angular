const express = require('express');
const bcrypt = require('bcrypt');

const router = express.Router();
const Users = require('../database/models/users');
const { route } = require('./categories');


router.get('/',(req, res) => {
    Users.find((err, docs) => {
        if(!err) res.send(docs);
        else console.log(" error in retrieving categories...");
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
                .then((newuser) => res.send(newuser))
                .catch((error) => console.log("error occured.. :" + error))
        }
        catch(error){
            res.status(500).send();
        }
    })
    

    
});

router.post('/login', (req,res)=>{
    Users.find({"username":req.body.username},(err,user)=>{
        if(err){res.status(500).send();return}
        if(!user.length){res.status(500).send();return}
        try{
            if(bcrypt.compareSync(req.body.password,user[0].password)){
                res.send(user);
            }else{
                res.status(500).send("not a valid user");
            }
        }
        catch(err){
            res.status(500).send();
        }
    })
});

module.exports = router;
