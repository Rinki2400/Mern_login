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
      .status(200)
      .send({ msg: "Login Successful", username: user.username, token });
  } catch (error) {
    res.status(500).send({ error: error.message || "Login failed" });
  }
};

// for login api http://localhost:8080/api/registratemail
const registratemail = (req, res) => {
  res.status(200).send("registratemail page");
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
  res.status(200).send("createreset page");
};

// for login api http://localhost:8080/api/updateUser/:id
const updateUser = async (req, res) => {
  try {
    if (req.user.userId !== req.params.id) {
      return res.status(403).json({ error: "Unauthorized update attempt" });
    }

    const updatedUser = await UserModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.send({ msg: "Record Updated" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// for login api http://localhost:8080/api/resetPassword
const resetPassword = async (req, res) => {
  try {
   

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
    return res.status(500).send({ error: error.message || "Internal Server Error" });
  }
};
module.exports = {
  registered,
  login,
  registratemail,
  getUser,
  generateOTP,
  vertifyOTP,
  createreset,
  updateUser,
  resetPassword,
  verifyUser,
};
