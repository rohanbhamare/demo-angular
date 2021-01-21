const express = require('express');

const router = express.Router();
const Categories = require('../database/models/categories');

router.get('/',(req, res) => {
    Categories.find((err, docs) => {
        if(!err) res.send(docs);
        else console.log(" error in retrieving categories...");
    });
});

module.exports = router;
