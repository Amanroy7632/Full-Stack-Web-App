const multer = require("multer")
const path=require("path");
const {generateCode,ApiError} =require("../utils/index.js")
const storage=multer.diskStorage({
    destination:(req,file,callback)=>{
        callback(null,"./uploads")
    },
    filename:(req,file,callback)=>{
        // console.log(file);
        const originalname=file.originalname
        const extension=path.extname(originalname)
        const filename=originalname.replace(extension,"")
        const compressedFileName=filename.split(" ").join("_")
        const lowercaseFileName=compressedFileName.toLocaleLowerCase()
        const code =generateCode(8)
        const finalFileName=`${lowercaseFileName}_${code}${extension}`
        callback(null,finalFileName)
    },
})
const upload=multer({
    storage:storage,
    fileFilter:(req,file,callback)=>{
        console.log(file);
        const mimetype=file.mimetype
        if (mimetype==="image/jpeg" || 
             mimetype==="image/png" ||
              mimetype==="image/gif"|| 
             mimetype==="image/jpg" ||
             mimetype==="application/pdf") 
        {
             callback(null,true)
        }else{
            callback(new ApiError(400,"Only .pdf or .jpg or .gif or .jpeg and .png are supported"))
        }
    }
})
module.exports=upload