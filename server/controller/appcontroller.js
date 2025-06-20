const UserModel = require("../model/User.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const otpGenerator = require("otp-generator");

const JWT_SECRET = "thisIsYourSuperSecretKey123!";

// middle ware to verifie user
const verifyUser = async (req, res, next) => {
  try {
    const { username } = req.method === "GET" ? req.query : req.body;

    // Validate input
    const exist = await UserModel.findOne({ username });

    if (!exist) {
      return res.status(400).send({ error: "Can't find User!" });
    }

    next(); // Proceed to the next middleware if the user exists
  } catch (error) {
    return res.status(404).send({ error: "Authentication error" });
  }
};

// for registered  api http://localhost:8000/api/registered
const registered = async (req, res) => {
  try {
    const { username, password, email, profile } = req.body;

    const existUsername = await UserModel.findOne({ username });
    if (existUsername) {
      return res.status(400).send({ error: "PLease use Unique Username" });
    }
    const existEmail = await UserModel.findOne({ email });
    if (existEmail) {
      return res.status(400).send({ error: "please use unique Email" });
    }

    if (!password) {
      return res.status(400).send({ error: "Password is required !!" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new UserModel({
      username,
      password: hashedPassword,
      profile: profile || "",
      email,
    });

    await user.save();
    res.status(201).send({ msg: "User Registered Successfuly" });
  } catch (error) {
    res.status(500).send({ error: error.message || "Registered Failed" });
  }
};

// for login api http://localhost:8080/api/login

const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await UserModel.findOne({ username });
    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }

    const isPasswordVaild = await bcrypt.compare(password, user.password);
    if (!isPasswordVaild) {
      return res.status(401).send({ error: "Invalid password" });
    }

    const token = jwt.sign(
      { userId: user._id, username: user.username },
      JWT_SECRET,
      { expiresIn: "24h" }
    );

    res
      .status(201)
      .send({ msg: "Login Successful", username: user.username, token });
  } catch (error) {
    res.status(500).send({ error: error.message || "Login failed" });
  }
};



// for login api http://localhost:8080/api/user/exampl121
const getUser = async (req, res) => {
  try {
    const { username } = req.params;

    if (!username) {
      return res.status(400).send({ error: "Invalid Username" });
    }

    const user = await UserModel.findOne({ username }).lean();
    delete user.password;

    if (!user) {
      return res.status(404).send({ error: "Couldn't Find the User" });
    }

    return res.status(200).send(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    return res.status(500).send({ error: "Internal Server Error" });
  }
};
// for login api http://localhost:8080/api/generateOTP
const generateOTP = async (req, res) => {
  req.app.locals.OTP = otpGenerator.generate(6, {
    lowerCaseAlphabets: false,
    upperCaseAlphabets: false,
    specialChars: false,
  });
  console.log("Generated OTP:", req.app.locals.OTP);
  res.status(201).send({ code: req.app.locals.OTP });
};

// for login api http://localhost:8080/api/vertifyOTP
const vertifyOTP = (req, res) => {
  const { code } = req.query;
  if (parseInt(req.app.locals.OTP) === parseInt(code)) {
    req.app.locals.OTP = null; // reset the OTP value
    req.app.locals.resetSession = true; // start session for reset password
    return res.status(201).send({ msg: "Vertified Succesfully" });
  }
  return res.status(400).send({ error: "Invalid OTP" });
};

// for login api http://localhost:8080/api/createreset
const createreset = (req, res) => {
  if (req.app.locals.resetSession) {
    return res.status(201).send({ flag: req.app.locals.resetSession });
  }
  return res.status(440).send({ error: "Session expired!" });
};

// for login api http://localhost:8080/api/updateUser/:id
const updateUser = async (req, res) => {
  try {
    const { userId } = req.user; // Extracted from token middleware

    if (!userId) {
      return res.status(401).json({ error: "Unauthorized: No user ID found" });
    }

    const updatedUser = await UserModel.findByIdAndUpdate(
      userId,
      req.body,
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ msg: "Record Updated", user: updatedUser });
  } catch (error) {
    console.error("Update error:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// for login api http://localhost:8080/api/resetPassword
const resetPassword = async (req, res) => {
  try {
    if (!req.app.locals.resetSession) {
      return res.status(440).send({ error: "Session expired!" });
    }

    const { username, password } = req.body;
    const user = await UserModel.findOne({ username });

    if (!user) {
      return res.status(404).send({ error: "Username not found!" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await UserModel.updateOne({ username }, { password: hashedPassword });

    req.app.locals.resetSession = false; // Reset session
    return res.status(201).send({ msg: "Password updated successfully!" });
  } catch (error) {
    return res
      .status(500)
      .send({ error: error.message || "Internal Server Error" });
  }
};
module.exports = {
  registered,
  login,
  getUser,
  generateOTP,
  vertifyOTP,
  createreset,
  updateUser,
  resetPassword,
  verifyUser,
};
