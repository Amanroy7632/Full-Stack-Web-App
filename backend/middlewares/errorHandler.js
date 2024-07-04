const {ApiError} =require("../utils/index.js")
const errorHandler =(error,req,res,next)=>{
  const code =error.statusCode?error.statusCode:500
//   console.log(`Error: ${error.stack}`);
  res.status(code).send(new ApiError(code,`${error.message}`,error.stack))
}
module.exports=errorHandler