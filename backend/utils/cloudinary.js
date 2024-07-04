const cloudinary = require("cloudinary").v2
const fs=require("fs")
const {cloudinary_cloud_name,cloudinary_api_key,cloudinary_api_secret} = require("../constants/keys.js")

cloudinary.config({
    cloud_name:cloudinary_cloud_name,
    api_key:cloudinary_api_key,
    api_secret:cloudinary_api_secret
})
const uploadOnCloudinary = async (localFilePath)=>{
    try {
        if (!localFilePath) {
            return null
        }
        const response =await cloudinary.uploader.upload(localFilePath,{
            resource_type:"auto"
        })
        console.log(`File uploaded successfully to cloudinary`)
        fs.unlinkSync(localFilePath)
        return response
    } catch (error) {
        console.log(`ERROR: ${error.message}`)
        fs.unlinkSync(localFilePath)
        return null
    }
}
module.exports={uploadOnCloudinary}