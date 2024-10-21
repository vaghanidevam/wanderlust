// const { string } = require("joi");
// const mongoose = require("mongoose");

// const reviewSchema = new mongoose.Schema({
//     rating: {
//         type: Number,
//         required: true,
//     },
//     comment: {
//         type: String,
//         required: true,
//     },
//     createdAt:{
//         type: Date,
//         default: Date.now()
//     }
// });

// const revmsg = mongoose.model('revmsg', reviewSchema);
// module.exports = revmsg;


const { required } = require("joi");
const mongoose = require("mongoose");
const { type, schema } = require("../schema");
const Schema = mongoose.Schema;
const reviewschma = new mongoose.Schema({
    rating: {
        type: String,
        required: true
    },
    Comment: {
        type: String,
        required: true
    },
    createdAt:{
        type: Date,
        default: Date.now()
    },
    author:{
        type: Schema.Types.ObjectId,
        ref: "user"
        
    }
});
const rev = mongoose.model("rev", reviewschma);
module.exports = rev;