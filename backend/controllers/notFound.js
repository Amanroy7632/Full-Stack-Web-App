const ApiError =require("../utils/ApiError.js")
const notFound=(req,res,next)=>{
    throw new ApiError(404,"Api not found")
}
module.exports=notFound