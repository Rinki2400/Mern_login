const UserModel = require("../model/User.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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
      process.env.JWT_SECRET || JWT_SECRET,
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
const getUser =  async(req, res)=>{
  try {
    const { username } = req.params;

    if (!username) {
      return res.status(400).send({ error: "Invalid Username" });
    }

    const user = await UserModel.findOne({ username });

    if (!user) {
      return res.status(404).send({ error: "Couldn't Find the User" });
    }

    // Remove password field before sending the response
    const { password, ...rest } = user.toObject(); // toObject() is clearer than toJSON()

    return res.status(200).send(rest);
  } catch (error) {
    console.error("Error fetching user:", error);
    return res.status(500).send({ error: "Internal Server Error" });
  }
}
// for login api http://localhost:8080/api/generateOTP
const generateOTP = (req, res) => {
  res.status(200).send("generateOTP page");
};
// for login api http://localhost:8080/api/vertifyOTP
const vertifyOTP = (req, res) => {
  res.status(200).send("vertifyOTP page");
};

// for login api http://localhost:8080/api/createreset
const createreset = (req, res) => {
  res.status(200).send("createreset page");
};
// for login api http://localhost:8080/api/updateUser
const updateUser = (req, res) => {
  res.status(200).send("updateUser page");
};
// for login api http://localhost:8080/api/resetPassword
const resetPassword = (req, res) => {
  res.status(200).send("resetPassword page");
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
verifyUser};
