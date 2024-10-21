const listing = require("../models/listing");
const axios = require('axios');


module.exports.index =async (req, res)=>{
    const alllisting =  await listing.find({});
    res.render("./Listing/index.ejs", {alllisting});
  };

  module.exports.new = (req,res)=>{
    res.render("./Listing/new.ejs");
}

module.exports.newCreate = async (req, res, next)=>{
    const address = req.body.listing.location;
    const urll = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(address)}&format=json`;
    const response = await axios.get(urll);
        const location = response.data[0];
        console.log(location.lat);
        console.log(location.lon);
    
      const url = req.file.path;
      const filename =  req.file.filename;
      console.log(url);
      console.log(filename);
    const list = await new listing (req.body.listing);
    list.owner = req.user._id;
    list.image = {url, filename};
 list.coordinates = [location.lat, location.lon];
  console.log(list.coordinates);
    await list.save();
    req.flash("success", "new listing created!");
    res.redirect("/listings");
    

};

module.exports.show = async (req, res)=>{

    let {id} = req.params;
    const listingg =  await listing.findById(id).populate({path: "reviews", populate:{
        path: "author"
    }}).populate("owner");
    if(!listingg){
        req.flash("error", "listing you requested for does not exist!");
        res.redirect("/listings");
    };
    res.render("./Listing/show.ejs", {listingg});

};


module.exports.edit = async (req, res)=>{
    
    let {id} = req.params;
    const listingg =  await listing.findById(id);
    if(!listingg){
        req.flash("error", "listing you requested for does not exist!");
        res.redirect("/listings");
    };
    res.render("./listing/edit.ejs", {listingg});
};


module.exports.update = async (req, res)=>{
    const {id} = req.params;
    const list =   await listing.findByIdAndUpdate(id, {...req.body.listing});
    if(typeof req.file !== "undefined"){
    const url = req.file.path;
    const filename =  req.file.filename;
    list.image = {url, filename};
    await list.save();
}

    req.flash("success", "listing updated!");
    res.redirect(`/listings/${id}`);
};

module.exports.delete = async (req, res)=>{
    let {id} = req.params;
    await listing.findByIdAndDelete(id);
    req.flash("success", "listing deleted!");
    res.redirect("/listings");
};