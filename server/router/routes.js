const express = require("express");
const { registered, registratemail, login, user, generateOTP, vertifyOTP, createreset, updateUser, resetPassword, verefyUser } = require("../controller/appcontroller");
const router = express.Router();

// put routes

// post routes
router.post("/registered", registered);

router.post("/registratemail", registratemail);

router.post("/login", verefyUser, login);

router.post("/authenticate", (req,res) =>
res.send(""));

// get routes

router.get("/user/:username", user);
router.get("/generateOTP", generateOTP);
router.get("/vertifyOTP", vertifyOTP);

router.get("/createreset", createreset);

// put router
router.put("/updateUser", updateUser);

router.put("/resetPassword", resetPassword);
module.exports = router;
