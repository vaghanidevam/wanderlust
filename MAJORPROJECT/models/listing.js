const mongoose = require("mongoose");
const { type } = require("os");
const { title } = require("process");

const Schema = mongoose.Schema;

const listingSchema =  new Schema({
    title: {
        type: String
    },
    description: {
        type:String,
        require: true
    },
    image: {
        type: String,
        default: "link",
        set: (v) => v === "" ? "link"  :  v,
    },
    price: {
        type: Number
    }, 
    location: {
        type: String
    },
    country: {
        type: String
    }
});

const listing = mongoose.model("listing", listingSchema);

module.exports = listing;