const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please provide a unique username"],
        unique: true,
        trim: true,
        minlength: 3
    },
    password: {
        type: String,
        required: [true, "Please provide a password"]
    },
    email: {
        type: String,
        required: [true, "Please provide a unique email"],
        unique: true
    },
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    mobile: {
        type: String
    },
    address: {
        type: String
    },
    profile: {
        type: String
    }
});

module.exports = mongoose.model('User', UserSchema);
