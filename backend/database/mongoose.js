const mongoose = require('mongoose');


mongoose.connect("mongodb+srv://rohanbhamare:180888@clusterdemo.le7bc.mongodb.net/mediaDb?retryWrites=true&w=majority",{useNewUrlParser:true,useUnifiedTopology:true},
                ()=>console.log("mongoDb connection succeded."));

module.exports = mongoose; 