const express = require("express");
const router = express.Router();
const listing = require("../models/listing.js");
const mehtodOverride = require("method-override");
const { listingSchema } = require("../schema.js");
const { loginMiddleware, isOwner } = require("../middleware.js");
const listingController = require("../CONTROLLER/listingg.js");
const multer = require('multer');
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });

asyncWrap = (fn) => {
    return (req, res, next) => {
        fn(req, res, next).catch(next);
    }
};

class ExpressError extends Error {
    constructor(statusCode, message) {
        super();
        this.statusCode = statusCode;
        this.message = message;
    }
}

router.route("")
    .get(asyncWrap(listingController.index))
    .post(loginMiddleware, upload.single("listing[image]"), asyncWrap(listingController.newCreate));

router.get("/new", loginMiddleware, listingController.new);

router.get("/:id", asyncWrap(listingController.show));

router.get("/:id/edit", loginMiddleware, isOwner, asyncWrap(listingController.edit));

router.put("/:id", loginMiddleware, isOwner, upload.single("listing[image]"), asyncWrap(listingController.update));

router.delete("/:id", loginMiddleware, isOwner, asyncWrap(listingController.delete));

module.exports = router;
