const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/mediaDb",{useNewUrlParser:true,useUnifiedTopology:true},
                ()=>console.log("mongoDb connection succeded."));

module.exports = mongoose; 