const express = require("express");
const { registered, registratemail, login, getuser, generateOTP, vertifyOTP, createreset, updateUser, resetPassword, verifyUser } = require("../controller/appcontroller");
const router = express.Router();

// put routes

// post routes
router.post("/registered", registered);

router.post("/registratemail", registratemail);

router.post("/login", verifyUser, login);

router.post("/authenticate", (req,res) =>
res.send(""));

// get routes

router.get("/user/:username", getuser);
router.get("/generateOTP", generateOTP);
router.get("/vertifyOTP", vertifyOTP);

router.get("/createreset", createreset);

// put router
router.put("/updateUser", updateUser);

router.put("/resetPassword", resetPassword);
module.exports = router;
