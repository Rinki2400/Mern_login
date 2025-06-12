const express = require('express');
const router = express.Router();

// Sample controller function
 const getHomePage = (req, res) => {
    res.status(200).send("Welcome to the Home Page!");
};


module.exports = router;
