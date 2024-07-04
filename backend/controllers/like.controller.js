const Like = require("../models/like.models")
const { ApiError, ApiResponse } = require("../utils")

const likePost = async (req, res, next) => {
    try {
        const {_id} =req.user
        const {postId} =req.params
        if (!(_id || postId)) {
            throw new ApiError(400,"Invalid credentials,please login first")
        }
        const checkAlreadyLiked =await Like.findOne({likedBy:_id,post:postId})
        if(checkAlreadyLiked){
            //remove the like from the post
            const removeLike = await Like.findOneAndDelete({likedBy:_id,post:postId})
            return res.status(200).send(new ApiResponse(200,removeLike,"Disliked the post successfully"))
        }
        const newLike = await Like.create({likedBy:_id,post:postId})
        return res.status(200).send(new ApiResponse(200,newLike,"Post Liked successfully"))

    } catch (error) {
        next(error)
    }
}
const likeComment = async (req,res,next)=>{
    try {
        const {_id} =req.user
        const {postId} =req.params
        
    } catch (error) {
        next(error)
    }
}
module.exports = { likePost }