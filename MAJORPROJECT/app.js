const express = require("express");
const app = express();
const mongoose = require("mongoose");
const listing = require("../MAJORPROJECT/models/listing.js");
const path = require("path");
const mehtodOverride =  require("method-override");
const ejsMate = require("ejs-mate");
const asyncWrap = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");

app.set("view engine", "ejs");
app.set("VIEWS", path.join(__dirname, "VIEWS"));
app.use(express.static(path.join(__dirname, "PUBLIC")));
app.use(express.urlencoded({extended:true}));
app.use(mehtodOverride("_method"));
app.engine("ejs", ejsMate);



const MONOGO_URL = "mongodb://localhost:27017/wanderlust";

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


//* app.get("/test", (req, res)=>{
//     let place1 = new listing({
//        title: "helo",
//        description:"hi",
//        price: 399,
//        country: "india"
//    });
//    place1.save();
//    console.log("done");
// })


app.get("/", (req,res)=>{
    res.send("helo");
});




// index route

app.get("/listings", asyncWrap( async (req, res)=>{
  const alllisting =  await listing.find({});
  res.render("./Listing/index.ejs", {alllisting});
}));

// new route

app.get("/listings/new", (req,res)=>{
    res.render("./Listing/new.ejs");
});

// new create route

app.post("/listings", asyncWrap( async (req, res, next)=>{
     if(!req.body.listing){
        new ExpressError(400, "send valid data for listing");
     }

        const list = await new listing (req.body.listing);
        await list.save();
        res.redirect("/listings");
        
   
}));


//show route

app.get("/listings/:id", asyncWrap( async (req, res)=>{

    let {id} = req.params;
    const listingg =  await listing.findById(id);
    res.render("./Listing/show.ejs", {listingg});

}));

//edit route

app.get("/listings/:id/edit",asyncWrap( ( async (req, res)=>{
    
    let {id} = req.params;
    const listingg =  await listing.findById(id);
    res.render("./listing/edit.ejs", {listingg});
})));

// update route
app.put("/listings/:id",asyncWrap( async (req, res)=>{
    if(!req.body.listing){
        new ExpressError(400, "send valid data for listing");
     }
    let {id} = req.params;
    await listing.findByIdAndUpdate(id, {...req.body.listing});
    res.redirect(`/listings/${id}`);
}));

//delete route

app.delete("/listings/:id", asyncWrap( async (req, res)=>{
    let {id} = req.params;
    await listing.findByIdAndDelete(id);
    res.redirect("/listings");
}));

app.all('*',(req, res, next)=>{
    next(new ExpressError(404,"page not found!"));
});

app.use((err, req, res, next)=>{
    const {statusCode = 500, message} = err;
    res.render("./listing/error.ejs", {statusCode, message});
});


// server port listen
app.listen(8080, ()=>{
    console.log("server is listening to port 8080")
});
