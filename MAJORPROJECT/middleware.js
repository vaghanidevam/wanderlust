const listing = require("../MAJORPROJECT/models/listing");
const rev = require("../MAJORPROJECT/models/review");

module.exports.loginMiddleware = (req, res, next)=>{
    if(!req.isAuthenticated()){
        req.session.redirectUrl = req.originalUrl;
        req.flash("error", "you must be logged in to create listing!");
        res.redirect("/login");
        
   }
   next();
   
};

module.exports.saveRedirectUrl = (req, res, next)=>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl = req.session.redirectUrl;

    }
    next();
}

// module.exports.isOwner = async(req, res, next)=>{
//     let {id} = req.params;
//     let listt = await listing.findById(id);
//     if (!listt.owner._id.equals(res.locals.curruser._id)){
//        req.flash("error", "you don't have permission to edit");
//        res.redirect(`/listings/${id}`);
//     }
//     else{
//         next();
//     }
   
// }



module.exports.isOwner = async (req, res, next) => {
    const id = req.params.id; // Assuming you're getting the ID from request params
    const listt = await listing.findById(id);
    
    if (!listt || !listt.owner || !res.locals.curruser) {
        return res.status(404).send('List not found or user not authenticated');
    }

    if (!listt.owner._id.equals(res.locals.curruser._id)) {
        return res.status(403).send('You are not the owner of this list');
    }

    next(); // Proceed if everything is fine
};





module.exports.isReviewAuthor = async(req, res, next)=>{
    let {id, reviewId} = req.params;
    let review = await rev.findById(reviewId);
    console.log(review);
    if (!review.author._id.equals(res.locals.curruser._id)){
       req.flash("error", "you are not the author of this review");
       res.redirect(`/listings/${id}`);
    }
    else{
        next();
    }
   
}
