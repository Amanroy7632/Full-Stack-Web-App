const ApiError = require("../utils/ApiError");
const ApiResponse = require("../utils/ApiResponse")

const uploadFile=async (req, res, next) =>{
  try {
    const {file}=req 
    console.log(file);
    if (!file) {
        res.status(400)
        throw new ApiError(400,"File is not selected")
    }
    res.status(200).send(new ApiResponse(200,{},"Filen uploaded successfully"))
  } catch (error) {
    next(error)
  }
}
module.exports={uploadFile}