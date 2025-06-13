// for registered  api http://localhost:8000/api/registered
const registered = (req, res) => {
  res.status(200).send("Welcome to the Home Page!");
};

// for login api http://localhost:8080/api/login

const login = (req, res) => {
  res.status(200).send("login page");
};

// for login api http://localhost:8080/api/registratemail
const registratemail = (req, res) => {
  res.status(200).send("registratemail page");
};

// for login api http://localhost:8080/api/authenticate
const authenticate = (req, res) => {
  res.status(200).send("authenticate page");
};

// for login api http://localhost:8080/api/user/exampl121
const user = (req, res) => {
  res.status(200).send("user page");
};
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
  authenticate,
  user,
  generateOTP,
  vertifyOTP,
  createreset,
  updateUser,
  resetPassword,
};
