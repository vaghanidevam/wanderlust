const express = require("express");
const router = express.Router({ mergeParams: true });
const rev = require("../models/review.js");
const listing = require("../models/listing.js");
const { loginMiddleware, isReviewAuthor } = require("../middleware.js");
const reviewController = require("../CONTROLLER/revieww.js");

class ExpressError extends Error {
    constructor(statusCode, message) {
        super();
        this.statusCode = statusCode;
        this.message = message;
    }
};

asyncWrap = (fn) => {
    return (req, res, next) => {
        fn(req, res, next).catch(next);
    }
};

router.post("/", loginMiddleware, asyncWrap(reviewController.createReview));

router.delete("/:reviewId", loginMiddleware, isReviewAuthor, asyncWrap(reviewController.deleteReview));

module.exports = router;
