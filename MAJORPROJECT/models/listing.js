const { ref, string, number } = require("joi");
const mongoose = require("mongoose");
const rev = require("../models/review");
const { type } = require("../schema");

const Schema = mongoose.Schema;

const listingSchema = new Schema({
    title: {
        type: String
    },
    description: {
        type: String,
        required: true
    },
    image: {
        url: String,
        filename: String
    },
    price: {
        type: Number
    },
    location: {
        type: String
    },
    country: {
        type: String
    },
    type: {
        type: String,
        required: true
    },
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: "rev",
            required: false
        }
    ],
    owner: {
        type: Schema.Types.ObjectId,
        ref: "user"
    },
    coordinates: {
        type: [Number], // Array of Numbers: [longitude, latitude]
        required: true
    },
    phoneNumber: {  // Added phoneNumber field
        type: String,
        required: false, 
        match: [/^\d{10}$/, 'Phone number must be a 10 digit number'] // Optional regex for validation
    },
    email: {  // Added email field
        type: String,
        required: false, // Optional field
        // Can be unique if needed
        match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address'] // Regex for email validation
    },
    status: {
        type: String,
        enum: ['pending', 'approved'], // Restricting values to 'pending' and 'approved'
        default: 'pending' // Default value is 'pending'
    },
    deApproved:{
        type:String,
        default:false
    }
});

listingSchema.post("findOneAndDelete", async (listing) => {
    if (listing) {
        await rev.deleteMany({ _id: { $in: listing.reviews } });
    }
});

const listing = mongoose.model("listing", listingSchema);

module.exports = listing;
