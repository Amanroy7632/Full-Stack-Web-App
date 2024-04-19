const {validationResult}=require("express-validator")
const ApiError =require("../utils/ApiError.js")
const validate=(req,res,next)=>{
    const errors=validationResult(req)
    const mappedErrors={}
    if(Object.keys(errors.errors).length===0){
        next()
    }else{
        errors.errors.map((error)=>{
            mappedErrors[error.path]=error?.msg
        })
        // throw new ApiError(400,errorArray)
        res.status(400).json(mappedErrors)
    }
    // console.log(errors.errors);
}
module.exports = validate