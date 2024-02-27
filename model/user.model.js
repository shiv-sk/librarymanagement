const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const UserSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        lowercase:true,
        trim:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true
    },
    fullname:{
        type:String,
        required:true,
        lowercase:true,
        trim:true
    },
    role:{
        type:String,
        enum:["student" , "admin"],
        default:"student"
    },
    phoneNumber:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    }
},{timestamps:true})

//pre hooks used for encrypting password before saving user in database
UserSchema.pre("save" , async function(next){
    if(!this.isModified("password")){
        return next();
    }
    this.password = await bcrypt.hash(this.password,10);
    next();
})

//comparing password using bcrypt
UserSchema.methods.ispasswordcorrect = async function(password){
    return await bcrypt.compare(password,this.password);
}

//generating access token for authethication
UserSchema.methods.generateAccessToken = function(){
    return jwt.sign({
        id:this._id,
        username:this.username,
        email:this.email
    },process.env.ACCESS_TOKEN_SECRET,
    {expiresIn:process.env.ACCESS_TOKEN_EXPIRY})
}

const User = mongoose.model("User" , UserSchema)
module.exports=User