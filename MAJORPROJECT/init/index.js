const mongoose = require("mongoose");
const listing = require("../models/listing.js");
const initData = require("./data.js");

const MONOGO_URL = "mongodb://localhost:27017/wanderlust";

main()
.then(()=>{
    console.log("connected to DB");
})
.catch((err)=>{
   console.log(err);
});

async function main(){
    await mongoose.connect(MONOGO_URL);
}

const intiDB = async ()=>{
      await listing.deleteMany({});
      await listing.insertMany(initData.data);
      console.log("helo");
}

intiDB();