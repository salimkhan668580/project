const express=require("express");
const authController=require("../controller/authController.js")
const router=express.Router()

router.post("/signup",authController.signup);
router.post("/login",authController.login);
router.post("/forget-password",authController.forget);

module.exports=router