const {ApiError,ApiResponse} = require("../utils/index.js");
const { uploadOnCloudinary } = require("../utils/cloudinary");
const uploadFile=async (req, res, next) =>{
  try {
    const {file}=req 
    console.log(file);
    if (!file) {
        res.status(400)
        throw new ApiError(400,"File is not selected")
    }
    const response =await uploadOnCloudinary(file)
    if (!response) {
      throw new ApiError(400,"File is required")
    }
    res.status(200).send(new ApiResponse(200,response,"Filen uploaded successfully"))
  } catch (error) {
    next(error)
  }
}
module.exports={uploadFile}