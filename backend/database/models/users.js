const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = mongoose.Schema({
    username:String,
    password:String
});

userSchema.methods.verifyPassword = (password,hashPassword) => {
    return bcrypt.compareSync(password,hashPassword);
}

userSchema.methods.generateJwt = (id)=>{
    return jwt.sign({_id: id},process.env.JWT_SECRET,{expiresIn: process.env.JWT_EXP})
}

const UserModel = mongoose.model('users',userSchema);
module.exports = UserModel;