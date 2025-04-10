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
    res.status(500).json({ message: "Something went wrong", error: err.message });
  });


app.post("/send-otp",async(req,res)=>{
    const {
    email
    }= req.body;
   const otp = Math.floor(100000 + Math.random() * 900000);
    const otpSend=await sendEmail(email,otp)
    console.log(otpSend)
    res.status(200).json({
        status:true,
        otp
    })
})

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})