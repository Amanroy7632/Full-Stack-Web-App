const { default: mongoose } = require("mongoose")
const {Category,User}=require("../models/index.js")
const ApiError = require("../utils/ApiError")
const ApiResponse = require("../utils/ApiResponse")
const addCategory=async(req,res,next)=>{
 try {
    const {title,description}=req.body
    const {_id}=req.user
    const isCategoryExist=await Category.findOne({title})
    if (isCategoryExist) {
        res.status(400)
        throw new ApiError(400,"There is already a category with the specified title and description")
    }
    const user=await User.findById(_id)
    if (!user) {
        res.status(404)
        throw new ApiError(404,"User not found")
    }
    const newCategory=new Category({title,description,updatedBy:user})
    await newCategory.save()
    res.status(200).send(new ApiResponse(200,newCategory,"New category added successfully"))
 } catch (error) {
    next(error)
 }
}
const updateCategory=async(req,res,next)=>{
  try {
    const {id}=req.params
    const {_id}=req.user
    // console.log(id,_id);
    const {title,description}=req.body
    
    const user=await User.findById(_id)
    if (!user) {
        res.status(401,"User not found or not a Admin")
        throw new ApiError(401,"User is not an admin or not valid user")
    }
    const category=await Category.findById(id)
    if (!category) {
        res.status(404)
        throw new ApiError(404,"Category not found")
    }
    const isCategoryExist=await Category.findOne({title})
    if (isCategoryExist && isCategoryExist.title===title && String(isCategoryExist._id)!==String(category._id)) {
        res.status(400)
        throw new ApiError(400,"Category Title already exist")
    }
    console.log(category.updatedBy);
    category.title=title?title:category.title
    category.description=description
    category.updatedBy=_id
    
    await category.save()
    res.status(200).send(new ApiResponse(200,category,"Category updated successfully"))

  } catch (error) {
    next(error)
  }
}
const deleteCategory =async(req,res,next)=>{
    try {
        const {id}=req.params
        const {_id}=req.user
        if(!id){
            res.status(404)
            throw new ApiError(404,"Category id not found")
        }
        const user =await User.findById(_id)
        if (!user) {
            res.status(401)
            throw new ApiError(401,"Access denied as you are not an Admin")
        }
        const category=await Category.findById(id)
        if (!category) {
            res.status(404)
            throw new ApiError(404,"Category not found")
        }
        const result=await Category.findOneAndDelete(id)
        if (!result) {
            res.status(404)
            throw new ApiError(404,"Category not found")
        }
        res.status(200).send(new ApiResponse(200,result,"Category deleted successfully"))
    } catch (error) {
        next(error)
    }
}
const getCategory = async (req,res,next)=>{
    try {
        // const {id}=req.params
        const {q,size,page}=req.query
        let query={}
        
        
        if (q) {
            const search=RegExp(q,'i')
            // console.log(search);
            query={ $or:[{title:search},{description:search}]}
        }
        const sizeNumber=parseInt(size) || 10;
        const pageNumber=parseInt(page) || 1;
        const totalDocumnet=await Category.countDocuments(query)
        const pages=Math.ceil(totalDocumnet/sizeNumber)

        console.log(query);
        const category=await Category.find(query)
                                     .skip((pageNumber-1)*sizeNumber)
                                     .limit(sizeNumber)
                                     .sort({updatedBy:-1})
        if (!category) {
            res.status(404)
            throw new ApiError(404,"Category not found") 
        }
        res.status(200)
        .send(new ApiResponse(200,
        {category,total:totalDocumnet,pages,size:sizeNumber}
        ,"Category fetched successfully"))
    } catch (error) {
        next(error)
    }
}
const getSingleCategory=async(req,res,next)=>{
    try {
        const {id}=req.params
        if (id && !mongoose.Types.ObjectId.isValid(id)){
            res.status(400)
            throw new ApiError(400,"Invalid category id")
        }
        if (!id) {
            res.status(400)
            throw new ApiError(400,"Category id is required")
        }
        const category=await Category.findById(id)
        if (!category) {
            res.status(404)
            .send(new ApiResponse(404,category,"Category not found"))
        }
        res.status(200)
        .send(new ApiResponse(200,category,"Category fetched successfully"))
    } catch (error) {
        next(error)
        
    }
}
module.exports={addCategory,
                updateCategory,
                deleteCategory,
                getCategory,
                getSingleCategory
            }