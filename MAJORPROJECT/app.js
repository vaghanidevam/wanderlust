const express = require("express");
const app = express();
const mongoose = require("mongoose");
const listing = require("../MAJORPROJECT/models/listing.js");
const path = require("path");
const mehtodOverride =  require("method-override");
const ejsMate = require("ejs-mate");

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

// server port listen
app.listen(8080, ()=>{
    console.log("server is listening to port 8080")
});



// index route

app.get("/listings", async (req, res)=>{
  const alllisting =  await listing.find({});
  res.render("./Listing/index.ejs", {alllisting});
});

// new route

app.get("/listings/new", (req,res)=>{
    res.render("./Listing/new.ejs");
});

// new create route

app.post("/listings", async (req, res)=>{
   const list = await new listing (req.body.listing);
   await list.save();
   res.redirect("/listings");
});


//show route

app.get("/listings/:id", async (req, res)=>{

    let {id} = req.params;
    const listingg =  await listing.findById(id);
    res.render("./Listing/show.ejs", {listingg});

});

//edit route

app.get("/listings/:id/edit", async (req, res)=>{
    
    let {id} = req.params;
    const listingg =  await listing.findById(id);
    res.render("./listing/edit.ejs", {listingg});
});

// update route
app.put("/listings/:id", async (req, res)=>{
    let {id} = req.params;
    await listing.findByIdAndUpdate(id, {...req.body.listing});
    res.redirect(`/listings/${id}`);
});

//delete route

app.delete("/listings/:id", async (req, res)=>{
    let {id} = req.params;
    await listing.findByIdAndDelete(id);
    res.redirect("/listings");
});