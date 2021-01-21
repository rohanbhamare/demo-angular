const mongoose = require('mongoose');

const catSchema = mongoose.Schema({
    title:String,
    subtitle:String,
    description:String,
    cid:Number
});

const CatModel = mongoose.model('categories',catSchema);
module.exports = CatModel;