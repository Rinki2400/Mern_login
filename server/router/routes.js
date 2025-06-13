const express = require("express");
const {
  registered,
  login,
  registratemail,
  authenticate,
  user,
  generateOTP,
  vertifyOTP,
  createreset,
  updateUser,
  resetPassword,

} = require("../controller/appcontroller");
const router = express.Router();

// put routes

// post routes
router.post("/registered", registered);

router.post("/registratemail", registratemail);

router.post("/login", login);

router.post("/authenticate", authenticate);

// get routes

router.get("/user/:username", user);
router.get("/generateOTP", generateOTP);
router.get("/vertifyOTP", vertifyOTP);

router.get("/createreset", createreset);

// put router
router.put("/updateUser", updateUser);

router.put("/resetPassword",resetPassword);
module.exports = router;
