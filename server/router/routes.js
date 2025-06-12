const express = require('express');
const getHomePage = require('../controller/appcontroller');
const router = express.Router();


// put routes


// post routes
router.post('/registered', getHomePage);

router.post('/registratemail',(req, res) =>{
    res.send("registred email")
})

router.post('/login',(req,res) =>{
    res.send("login")
})

router.post("/authenticate",(req,res)=>{
    res.send("authenticate")
})

// get routes

router.get('/user/:username', (req, res) => {
    res.send('Login page');
});
router.get('/generateOTP',(req,res) => {
    res.send('generate OTP')
})
router.get('/vertifyOTP',(req,res) =>{
    res.send('verified otp')
})

router.get("/createreset",(req,res) =>{
    res.send("create session ")
})

// put router
 router.put("/updateUser",(req,res) =>{
    res.send("Update User")
 })

 router.put("/resetPassword",(req,res) =>{
    res.send("Reset Password")
 })
module.exports = router;