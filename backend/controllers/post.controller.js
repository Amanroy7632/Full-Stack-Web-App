const {Post, User} = require("../models/index.js")
const {ApiError,ApiResponse} = require("../utils/index.js")
const { uploadOnCloudinary } = require("../utils/cloudinary.js")
// CRUD Opertaion on the post routes 
const createPost = async (req,res,next)=>{
    try {
        const {title,description}=req.body
        if (!title) {
            throw new ApiError(400,"Title must be required")
        }
        const fileLocalPath=req.file?.path
        if (!fileLocalPath) {
            throw new ApiError(400,"File must be provided")
        }
        const response = await uploadOnCloudinary(fileLocalPath)
        if (!response) {
            throw new ApiError(500,`Something went wrong uploading file`)
        }
        const post=await Post.create({postUrl:response.url,title,description,owner:req.user})
        res.status(200).send(new ApiResponse(200,post,"Post created successfully"))  
    } catch (error) {
        next(error)
    }
}
const getSinglePost =async (req,res,next)=>{
    try {
        const {postId}=req.params
        if (!postId) {
            throw new ApiError(400,"Invalid post id provided")
        }
        
        const post = await Post.findById(postId).select("-isPublic -_id -createdAt -updatedAt")
        const postBy = await User.aggregate([
            {
                $match:{
                    _id:post.owner
                }
            },
            {
                $lookup:{
                    from:"posts",
                    localField:"_id",
                    foreignField:"owner",
                    as:"postedby"
                }
            },
            {
                $project:{
                    // title:1,
                    // description:1,
                    // postUrl:1,
                    _id:0,
                    name:1,
                    // isPublic:1,
                    // postedby:1
                }
            }
        ])
        console.log(postBy[0].name);
        post.owner=postBy[0].name
        console.log(post.owner);
        if (!post) {
            res.status(200).send(new ApiResponse(404,{},"Post not found"))
        }
        res.status(200).send(new ApiResponse(200,{postUrl:post.postUrl,title:post.title,description:post.description,postedBy:postBy[0].name},"Post found successfully"))
    } catch (error) {
        next(error)
    }
}
const getAllPosts= async (req,res,next)=>{
    try {
        const {_id,name}=req.user
        // console.log(_id)
        if (!_id) {
            throw new ApiError(401,"Invalid credetials login first")
        }
        const allPosts = await Post.find({owner:_id}).select("-owner")
        // const posts = await Post.aggregate([
        //     {
        //         $match:{
        //             owner:_id
        //         }
        //     },
        //     {
        //         $lookup:{
        //             from:"posts",
        //             localField:"_id",
        //             foreignField:"owner",
        //             as:"myPosts"
        //         }
        //     },
        //     {
        //         $project:{
        //             myPosts:1
        //         }
        //     }
        // ])
        // console.log(posts.length)
        res.status(200).send(new ApiResponse(200,{posts:allPosts,owner:name,total:allPosts.length},"All posts fetched successfully"))
    } catch (error) {
        next(error)
    }
}
const updatePost = async (req,res,next)=>{
    try {
        const {title,description}=req.body
        const {postId} =req.params
        const {_id}=req.user
        const loaclFilePath =req.file?.path
        if (!postId) {
            throw new ApiError(400,"Post id is required")
        }
        if (!_id) {
            throw new ApiError(400,"Invalid credentials")
        }
        const prevPost = await Post.findOne({_id:postId,owner:_id})
        if (!prevPost) {
            throw new ApiError(404,"Post is not found")
        }
        let uploadResponse;
         if (loaclFilePath) {
              uploadResponse = await uploadOnCloudinary(loaclFilePath)
         }
        const response = await Post.findByIdAndUpdate(postId,{
            $set:{
                title:title?title:prevPost.title,
                description:description?description:prevPost.description,
                postUrl:uploadResponse?uploadResponse.url:prevPost.postUrl
            }
        },{
            new:true
        })
        res.status(200).send(new ApiResponse(200,response,"Post updated successfully"))
    } catch (error) {
        next(error)
    }
}
const deletePost =async (req,res,next)=>{
    try {
        const {postId} = req.params
        const {_id}=req.user
        if (!postId) {
            throw new ApiError(400,"Invalid credentials or post id is not valid")
        }
        if (!_id) {
            throw new ApiError(401,"Invalid credentials LOGIN first")
        }
        const response =await Post.findOneAndDelete({_id:postId,owner:_id})
        if (!response) {
            throw new ApiError(404,"Post not found")
        }
        res.status(200).send(new ApiResponse(200,response,"Post deleted successfully"))
    } catch (error) {
        next(error)
    }
}
const deleteAllPost =async(req,res,next)=>{
    try {
        const {_id}=req.user
        if (!_id) {
            throw new ApiError(401,"invalid credentials,Please Login first")
        }
        const response =await Post.deleteMany({owner:_id})
        if (!response) {
            throw new ApiError(404,"Posts not found ")
        }
        res.status(200).send(new ApiResponse(200,response,"All Posts are deleted successfully"))
    } catch (error) {
        next(error)
    }
}
module.exports={createPost,
                getSinglePost,
                getAllPosts,
                updatePost,
                deletePost,
                deleteAllPost}