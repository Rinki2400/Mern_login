const jwt = require("jsonwebtoken");

const JWT_SECRET = "thisIsYourSuperSecretKey123!";

const Auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      console.log("No token provided");
      return res.status(401).json({ error: "No token provided" });
    }

    console.log("Received Token:", token);

    const decoded = jwt.verify(token, JWT_SECRET);
    console.log("Decoded User:", decoded);
    req.user = decoded;
    next();
  } catch (error) {
    console.error("JWT Verification Error:", error.message);
    return res.status(401).json({ error: "Authentication Failed" });
  }
};

const localVariable = async (req, res, next) => {
    try {
        req.app.locals = {
            OTP: null,
            resetSession: false
        };
        next();
    } catch (error) {
        console.error("Error in localVariable middleware:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
module.exports = { Auth, localVariable};