const express = require("express");
const router = express.Router();
const user =  require("../models/users");
const asyncWrap = require("../../utils/wrapAsync.js");
const passport = require("passport");
const {saveRedirectUrl} = require("../middleware.js");
const userController = require("../CONTROLLER/userr.js");

router.get("/signup", userController.renderSignup);

router.post("/signup", asyncWrap( userController.signup));


router.get("/login", userController.renderLogin);

router.post("/login", saveRedirectUrl ,passport.authenticate("local", {failureRedirect: "/login", failureFlash: true}), userController.login);

router.get("/logout", userController.logout)
module.exports = router;