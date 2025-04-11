const User = require("../Models/User");
const asyncWrapper=require("../Middlerware/wrapAsync.js");
const genToken = require("../lib/generateToken.js");
const bcrypt = require("bcryptjs");


const signup=asyncWrapper(async(req,res)=>{
        const {
            city,
            role,
            fullName,
            email,
            mobile,
            gender,
            DOB,
            password,
            essentialDetails
        }=req.body;
        if(role=="teacher"&&!essentialDetails){
          res.status(404).json({
            message:"EssentailDetails is missing"
          })
        }
          const newUser= new User({
          city,
          role,
          fullName,
          email,
          mobile,
          gender,
          DOB,
          password,
          essentialDetails
        });
        await newUser.save();
        res.status(200).json({
            status:true,
            data:newUser
        })
})

const login=asyncWrapper(async(req,res)=>{
        const {
            email,
            password
        } = req.body;
   
 const user=await User.findOne({email});
  if(!user){
    res.status(404).json({
        status:false,
        message:"User not found"
    })
  }

  const isMathched=await bcrypt.compare(password, user.password)
  if(!isMathched){
    return res.status(401).json({ message: "Invalid password" });
  }
  const data={
    _id:user._id,
    fullName:user._id,
    email:user.email,
    gender:user.gender,
  }
    const token=await genToken(data)
        res.status(200).json({
            status:true,
            message:"Login Sucessfully",
            token:token
        })
})


const forget=asyncWrapper(async(req,res)=>{
        const {
            email,
            password
        } = req.body;
 const user=await User.findOne({email});
  if(!user){
    res.status(404).json({
        status:false,
        message:"User not found"
    })
  }
    user.password=password;
    await user.save() 
        res.status(200).json({
            status:true,
            message:"Password has been changed",
        })
})

module.exports={
    signup:signup,
    login:login,
    forget:forget
}