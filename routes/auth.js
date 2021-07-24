const router = require("express").Router();
const User = require("../models/User");
const OTP = require('../models/Otp');
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require('uuid');



//REGISTER
// /api/register 
router.post("/register", async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(req.body.password, salt);
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashedPass,
    });

    const user = await newUser.save();
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});


//LOGIN
// /api/login
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    !user && res.status(400).json("Wrong credentials!");

    const validated = await bcrypt.compare(req.body.password, user.password);
    !validated && res.status(400).json("Wrong credentials!");

    
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});


// LOGOUT
router.get('/logout', (req, res) =>{
   req.logout()
 
   req.flash('success_msg', 'You are logged out');
 
   res.redirect('/users/login');
 });



//Change Password
// /api/change/:id
router.patch("/change/:id", async (req, res) => {
   const {id} = req.params;
   try {
      const salt = await bcrypt.genSalt(10);
      const password = await bcrypt.hash(req.body.password, salt);
      const userPassword = await User.findByIdAndUpdate({_id :id}, {password : password},  {new: true})
      res.status(200).json(userPassword);
    } catch (err) {
      res.status(500).json(err);
    }
 }); 






// Forget and resetting password
router.post("/email", async (req, res) => {
   try {
      const data = await User.findOne({email : req.body.email})
      const responseType = {};
      if(data) {
         let otpcode = Math.floor( (Math.random() * 1000)+1);
         let otpData =  new OTP({
            email  : req.body.email,
            code  : otpcode,
            expireIn  : new Date().getTime() + 300*1000,
         });
         let otpResponse = await otpData.save()
         responseType.statusText = "Success";
         responseType.message = "Please check your email id to reset password";

      }else{
         responseType.statusText = "error";
         responseType.message = "Email id doesn't exit";
      }
     
     res.status(200).json(responseType);
   } catch (err) {
     res.status(500).json(err);
   }
 });


 router.post("/reset", async (req, res) => {
   try {
      const data = await User.findOne({email : req.body.email})
      const responseType = {};
      if(data) {
         let otpcode = Math.floor( (Math.random() * 1000)+1);
         let otpData =  new OTP({
            email  : req.body.email,
            code  : otpcode,
            expireIn  : new Date().getTime() + 300*1000,
         });
         let otpResponse = await otpData.save()
         responseType.statusText = "Success";
         responseType.message = "Please check your email id to reset password";

      }else{
         responseType.statusText = "error";
         responseType.message = "Email id doesn't exit";
      }
     
     res.status(200).json(responseType);
   } catch (err) {
     res.status(500).json(err);
   }
 });





module.exports = router;
