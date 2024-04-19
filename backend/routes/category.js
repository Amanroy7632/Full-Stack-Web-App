const express =require("express")
const {categoryController}=require("../controllers/index.js")
const {addCategoryValidator,idValidator}=require("../Validators/category.js")
const validate=require("../Validators/validate.js")
const isAuth = require("../middlewares/isAuth.js")
const isAdmin=require("../middlewares/isAdmin.js")
const router =express.Router()
router.post("/",isAuth,isAdmin,addCategoryValidator,validate,categoryController.addCategory)
router.put("/:id",isAuth,isAdmin,idValidator,validate,categoryController.updateCategory)
router.delete("/:id",isAuth,isAdmin,idValidator,validate,categoryController.deleteCategory)
router.get("/",isAuth,categoryController.getCategory)
router.get("/:id",isAuth,idValidator,validate,categoryController.getSingleCategory)
module.exports=router