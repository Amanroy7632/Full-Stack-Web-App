const express =require("express")
const isAuth = require("../middlewares/isAuth.js")
const {fileController}  =require("../controllers/index.js")
const upload =require("../middlewares/upload.js")
const router=express.Router()
router.post("/upload",isAuth,upload.single("image"),fileController.uploadFile)
router.post("/upload-multiple-file",isAuth,upload.array("image",3),fileController.uploadFile)
module.exports=router