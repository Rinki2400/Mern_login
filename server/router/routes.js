const express = require("express");
const {
  registered,
  login,
  getUser,
  generateOTP,
  vertifyOTP,
  createreset,
  updateUser,
  resetPassword,
  verifyUser,
} = require("../controller/appcontroller");
const { Auth, localVariable } = require("../middleware/auth");
const router = express.Router();
require("dotenv").config();

const { registerMail } = require("../controller/mailer");
// post routes
router.post("/registered", registered);

router.post("/registratemail", registerMail);
router.post("/login", verifyUser, login);
router.post("/authenticate", verifyUser, (req, res) => {
  res.end();
});

// get routes

router.get("/user/:username", getUser);
router.get("/generateOTP", verifyUser, localVariable, generateOTP);
router.get("/vertifyOTP", verifyUser,vertifyOTP);

router.get("/createreset",createreset);

// put router
router.put("/updateUser", Auth, updateUser);

router.put("/resetPassword", verifyUser, resetPassword);
module.exports = router;
