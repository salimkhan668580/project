const express = require('express')
const User = require('./Models/User')
const sendEmail = require('./lib/mail')
const app = express()
const authRouter=require("./routes/authRouter.js")
require('dotenv').config()
require("./lib/DBconnection")
const port = process.env.PORT||3000


app.use(express.json())

app.use("/auth",authRouter)
app.use((err, req, res, next) => {
    console.error(err.stack);
    if (err.name === "ZodError") {
      return res.status(400).json({ success: false, errors: err.errors[0].message });
    }
    res.status(500).json({ message: "Something went wrong", error: err.message });
  });

app.post("/send-otp",async(req,res)=>{
    const {
    email
    }= req.body;
    try {
      const user=await User.findOne({email});
      if(!user){
        res.status(404).json({
          status:false,
          message:"User not found"
        
      })
      }
      const otp = Math.floor(100000 + Math.random() * 900000);
       user.otp=otp;
       user.expireAt = new Date(Date.now() + 5 * 60 * 1000);
       await user.save()
        await sendEmail(email,otp)
      res.status(200).json({
          status:true,
          otp,
          user
      })
      
    } catch (error) {
      res.status(500).json({
        status:false,
        message:error.msg
    
    })
    }
 
})


app.post("/verify-otp",async(req,res)=>{
    const {
    email,
    otp
    }= req.body;
    try {
      const user=await User.findOne({email});
      if(!user){
        res.status(404).json({
          status:false,
          message:"User not found"
        
      })
      }
      if (otp !== user.otp || user.expireAt < Date.now()) {
        return res.status(404).json({
          status: false,
          message: "OTP is expired or incorrect. Please try again."
        });
      }
      user.otp=undefined;
      await user.save()
      res.status(200).json({
          status:true,
          message:"OTP verify successfully"

      })
      
    } catch (error) {
      res.status(500).json({
        status:false,
        message:error.msg
    
    })
    }
 
})

app.get('/', (req, res) => {
  res.send('Hello World!')
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})