const user =  require("../models/users");

module.exports.renderSignup =  (req, res)=>{
    res.render("users/signup.ejs")

};

module.exports.signup = async (req, res, next)=>{
    try{ let {email, username, password} = req.body;
    const newUser =  new user({email, username});
    const registeruser = await user.register(newUser, password);
    console.log(registeruser);
 
    req.login(registeruser, (err)=>{
     if(err){
         return next(err);
     }
     
    req.flash("success", "welcome to wanderlust!");
    res.redirect("/listings");
    })
 } catch(e){
     req.flash("error", e.message);
     res.redirect("/signup");
 }
 };

module.exports.renderLogin = (req, res)=>{
    res.render("users/login.ejs");
};

 module.exports.login = async(req, res)=>{
    req.flash("success", "welcome back to wanderlust");  
    let redirectUrl = res.locals.redirectUrl || "/listings";
     res.redirect(redirectUrl );
};


module.exports.logout = (req, res,next)=>{
    req.logOut((err)=>{
        if(err){
            next(err);
        }
        req.flash("success", "you are logged out now!");
        res.redirect("/listings");
    });
};