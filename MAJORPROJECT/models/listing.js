const { ref, string, number } = require("joi");
const mongoose = require("mongoose");
const { type } = require("os");
const { title } = require("process");
const rev = require("../models/review");

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
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: "rev",
            require: false
        }
     ],
     owner:{
        type: Schema.Types.ObjectId,
        ref: "user"

     },
     coordinates: {
        type: [Number], // Specify that this is an array of Numbers
        required: true
    }

});

listingSchema.post("findOneAndDelete", async(listing)=>{
    if(listing){
        await rev.deleteMany({_id:{$in : listing.reviews}});
    }
    
})

const listing = mongoose.model("listing", listingSchema);

module.exports = listing;