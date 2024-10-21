const express = require("express");
const router = express.Router({mergeParams:true});
const asyncWrap = require("../../utils/wrapAsync.js");
const ExpressError = require("../../utils/ExpressError.js");
const rev = require("../models/review.js");
const listing = require("../models/listing.js");
const {loginMiddleware, isReviewAuthor} = require("../middleware.js");
const reviewController = require("../CONTROLLER/revieww.js");


router.post("/",loginMiddleware, asyncWrap(reviewController.createReview));

//delete review route
router.delete("/:reviewId",loginMiddleware,isReviewAuthor, asyncWrap( reviewController.deleteReview ));



module.exports = router;