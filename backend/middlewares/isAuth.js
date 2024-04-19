const ApiError = require("../utils/ApiError");
const ApiResponse = require("../utils/ApiResponse");
const jwt=require("jsonwebtoken")
// const {jwtSecret}=require("../constants/keys.js")
const isAuth=async(req,res,next)=>{
  try {
    const authorization=req.headers.authorization && req.headers.authorization.split(" ")
    if (!authorization) {
      res.status(401)
      throw new ApiError(401,"Token is required")
    }
    const token=authorization.length>1?authorization[1]:null
    if (!token) {
        throw new ApiError(400,"Token is required.")
    }
    else{
        const payload=jwt.verify(token,"askbdkas")
        console.log(payload);
        if (payload) {
            req.user={
                _id:payload._id,
                name:payload.name,
                email:payload.email,
                role:payload.role
            }
            next()
        }
        else{
            throw new ApiError(401,"Unauthorized access")
        }
    }

  } catch (error) {
    next(error)
  }
}
module.exports=isAuth