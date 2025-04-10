const User = require("../Models/User");
const asyncWrapper=require("../Middlerware/wrapAsync.js")



const signup=asyncWrapper(async(req,res)=>{
        const {
            city,
            role,
            fullName,
            email,
            mobile,
            gender,
            DOB,
            password
        } = req.body;
        const newUser= new User({city,role,fullName,email,mobile,gender,DOB,password});
        await newUser.save();
        res.status(200).json({
            status:true,
            data:newUser
        })
})


module.exports={
    signup:signup
}