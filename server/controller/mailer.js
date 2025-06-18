const nodemailer = require("nodemailer");
const Mailgen = require("mailgen");

const {ENV} = require('../config')

// Configure the email transporter
const nodeConfig = {
  host: "smtp.ethereal.email",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user:ENV.EMAIL, // generated ethereal user
    pass: ENV.PASSWORD, // generated ethereal password
  },
};

const transporter = nodemailer.createTransport(nodeConfig);

const MailGenerator = new Mailgen({
  theme: "default",
  product: {
    name: "Mailgen",
    link: "https://mailgen.js/",
  },
});

/** 
 * POST: http://localhost:8080/api/registerMail 
 * @param: {
 *   "username": "example123",
 *   "userEmail": "admin123",
 *   "text": "",
 *   "subject": "",
 * }
 */
 const registerMail = async (req, res) => {
  try {
    const { username, userEmail, text, subject } = req.body;

    // Create the email body
    const email = {
      body: {
        name: username,
        intro: text || "Welcome to Daily Tuition! We're very excited to have you on board.",
        outro: "Need help, or have questions? Just reply to this email, we'd love to help.",
      },
    };

    const emailBody = MailGenerator.generate(email);

    const message = {
      from: ENV.EMAIL,
      to: userEmail,
      subject: subject || "Signup Successful",
      html: emailBody,
    };

    // Send the email
    await transporter.sendMail(message);
    return res.status(200).send({ msg: "You should receive an email from us." });
  } catch (error) {
    return res.status(500).send({ error: error.message || "Internal Server Error" });
  }
};

module.exports = { registerMail };