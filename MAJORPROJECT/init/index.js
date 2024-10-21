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
     initData.data = initData.data.map((obj)=>({...obj, owner:"66e1b6c60a64d7a265f01462"}));
      await listing.insertMany(initData.data);
      console.log("helo");
}

intiDB();