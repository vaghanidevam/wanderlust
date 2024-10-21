const cloudinary = require('cloudinary').v2;
const { allow } = require('joi');
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
    // cloud_name: process.env.CLOUD_NAME,
    // api_key: process.env.CLOUD_API_KEY,
    // api_secret: process.env.CLOUD_API_SECRET
      cloud_name: 'diejkaw2e', 
      api_key: '573773965916833', 
      api_secret: 'XxVUXwqiw48VeWJ_LriPB8XzeEI' 
})



const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: 'wanderlust_DEV',
      allowerdFormats: ["png", "jpg", "jpeg"],
    },
  });


  module.exports= {
    cloudinary,
    storage
  }