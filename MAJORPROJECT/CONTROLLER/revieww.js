const rev = require("../models/review");
const listing = require("../models/listing");

module.exports.createReview = async(req, res)=>{
    let list = await listing.findById(req.params.id);
    let newReview = await new rev(req.body.Review);
    newReview.author = req.user._id;
     list.reviews.push(newReview);
     console.log(newReview);
    await newReview.save();
    await list.save();
    res.redirect(`/listings/${req.params.id}`);
};


module.exports.deleteReview = async(req, res)=>{
    const{id, reviewId} = req.params;
   let a = await listing.findByIdAndUpdate(id, {$pull:{reviews:reviewId}});
   console.log(a);
   let b = await rev.findByIdAndDelete(reviewId);
   console.log(b);
    res.redirect(`/listings/${id}`);
    console.log("delete conform");
};