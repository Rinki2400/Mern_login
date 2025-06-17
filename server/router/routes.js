const express = require("express");
const { registered, registratemail, login, getUser, generateOTP, vertifyOTP, createreset, updateUser, resetPassword, verifyUser } = require("../controller/appcontroller");
const { Auth,localVariable } = require("../middleware/auth");
const router = express.Router();


// post routes
router.post("/registered", registered);

router.post("/registratemail", registratemail);

router.post("/login", verifyUser, login);

router.post("/authenticate", (req,res) =>
res.send(""));

// get routes

router.get("/user/:username", getUser);
router.get("/generateOTP",verifyUser,localVariable,generateOTP);
router.get("/vertifyOTP", vertifyOTP);

router.get("/createreset", createreset);

// put router
router.put("/updateUser/:id",Auth, updateUser);

router.put("/resetPassword", resetPassword);
module.exports = router;
