const { required } = require("joi");
const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const userschema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true  // Ensure that the email is unique
    },
    role: {
        type: String,
        enum: ['user', 'admin'],  // Define possible roles
        default: 'user',  // Default role is 'user'
    },
});

// Add passport-local-mongoose plugin to handle user authentication
userschema.plugin(passportLocalMongoose);

module.exports = mongoose.model("user", userschema);
