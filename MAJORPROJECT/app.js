if(!process.env.NODE_ENV != "production"){
    const dotenv = require('dotenv');
}



const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const mehtodOverride =  require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("../utils/ExpressError.js");
const Joi = require('joi');
const session = require("express-session");
const MongoStore = require('connect-mongo');
const flash = require("connect-flash");
const passport = require("passport");
const localStrategy = require("passport-local");
const user = require("../MAJORPROJECT/models/users.js");
const listingRouter = require("../MAJORPROJECT/routes/listings.js");
const reviewRouter = require("../MAJORPROJECT/routes/reviewws.js");
const userRouter = require("../MAJORPROJECT/routes/user.js");


app.set("view engine", "ejs");
app.set("VIEWS", path.join(__dirname, "VIEWS"));
app.use(express.static(path.join(__dirname, "PUBLIC")));
app.use(express.urlencoded({extended:true}));
app.use(mehtodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.json());






/////////////////////////////////////////////////////////////////
const MONOGO_URL = "mongodb+srv://wanderlust65:PJPTENxFaxnR40uN@cluster0.v6itl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
main()
.then(()=>{
    console.log("connected to DB");
})
.catch((err)=>{
   console.log(err);
   
})

async function main(){
    await mongoose.connect(MONOGO_URL);
}

/////////////////////////////////////////////////////////////////

const store = MongoStore.create({
    mongoUrl: 'mongodb+srv://wanderlust65:PJPTENxFaxnR40uN@cluster0.v6itl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',
    crypto:{
        secret: "wanderlust"
    },
    touchAfter: 24*3600
  });
//   store.on("error", ()=>{
//     console.log("error in mongo session store ", err);
//   });

const sessionOptions = {
    store:store,
    secret: "wanderlust",
    resave: false,
    saveUninitialized: true,
    cookie:{
        expires: Date.now() + 10 * 24 * 60 *60 *1000,
        maxAge: 10 * 24 * 60 * 60 * 1000,
        httpOnly: true
    },
};



app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(user.authenticate()));
passport.serializeUser(user.serializeUser());
passport.deserializeUser(user.deserializeUser()); 

// app.get("/demo", async (req,res)=>{
//     let user1 = user ({
//         email: "12w@gmail.com",
//         username: "helwo"
//     });

//    let u = await user.register(user1, "hellwoword");
//     res.redirect("/listings");

// })

////////////////////////////////////////////////////////////////

app.use((req, res, next)=>{
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.curruser = req.user; 
    
// console.log('Cloud Name:', process.env.CLOUD_NAME);
// console.log('API Key:', process.env.CLOUD_API_KEY);
// console.log('API Secret:', process.env.CLOUD_API_SECRET);

    next();
});


/////////////////////////////////////////////////////////////////


app.use("/listings", listingRouter);
app.use("/listings/:id/reviews", reviewRouter);
app.use("/", userRouter);


app.all('*',(req, res, next)=>{
    next(new ExpressError(404,"page not found!"));
});

app.use((err, req, res, next)=>{
const {statusCode = 500, message} = err;
 res.render("./listing/error.ejs", {statusCode, message});
});


/////////////////////////////////////////////////////////////////



// server port listen
app.listen(8080, ()=>{
    console.log("server is listening to port 8080")
});


/////////////////////////////////////////////////////////////////
