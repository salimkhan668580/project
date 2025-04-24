
const mongoose=require("mongoose");
const bcrypt = require('bcryptjs');

const Userschema=new mongoose.Schema({
    city:{
        type:String,
        required:true
    },
    otp:{
        type:Number,
    },
    expireAt:{
        type:Date
    },
    role:{
        type:String,
        enum:["teacher","school","student"]
    },
    fullName:{
        type:String,
        required:true
    },
    essentialDetails:{
        subject:String,
        experience:String,
        categroy:String
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    mobile:{
        type:Number,
        required:true,
        unique:true
    },
    gender:{
        type:String,
        required:true,
        enum:["male","female","other"]
    },
    DOB:{
        type:Date,
        required:true,
    },
    password:{
        type:String,
        required:true
    }

},{timestamps:true})

Userschema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (err) {
        return next(err);
    }
});
const User=mongoose.model("User",Userschema);
module.exports=User