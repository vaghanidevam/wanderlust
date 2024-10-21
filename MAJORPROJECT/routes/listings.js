const express = require("express");
const router = express.Router();
const asyncWrap = require("../../utils/wrapAsync.js");
const ExpressError = require("../../utils/ExpressError.js");
const listing = require("../models/listing.js");
const mehtodOverride =  require("method-override");
const {listingSchema} = require("../schema.js");
const {loginMiddleware, isOwner} = require("../middleware.js");
const listingController = require("../CONTROLLER/listingg.js");
const multer  = require('multer');
const {storage} = require("../cloudConfig.js");
const upload = multer({ storage });

// const validationListing = (req, res , next)=>{
//     const {error} =  listingSchema.validate(req.body);
//        if(error){
//         let err = error.details.map((e)=> e.message).join(",");
//         throw new ExpressError(400, err);
//        } else{
//         next();
//        }

// }


router.route("")
.get(asyncWrap( listingController.index )) // index route
.post(loginMiddleware,
      upload.single("listing[image]"),  
      asyncWrap( listingController.newCreate)); // new create route

// new route

router.get("/new", loginMiddleware, listingController.new);

//show route

router.get("/:id", asyncWrap( listingController.show));


//edit route

router.get("/:id/edit",loginMiddleware,isOwner, asyncWrap(listingController.edit ));


// update route
router.put("/:id",loginMiddleware,isOwner,upload.single("listing[image]"), asyncWrap(listingController.update ));

//delete route

router.delete("/:id",loginMiddleware,isOwner, asyncWrap( listingController.delete));

module.exports = router;