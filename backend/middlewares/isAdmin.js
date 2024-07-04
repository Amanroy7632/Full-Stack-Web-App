const {ApiError} = require("../utils/index.js")

const isAdmin=async(req,res,next)=>{
  try {
    if (req.user && (req.user.role===1 || req.user.role===2)) {
        next()
    }else{
        res.status(401)
        throw new ApiError(401,"Permission denied")
    }
  } catch (error) {
    next(error)
  }
}
module.exports=isAdmin