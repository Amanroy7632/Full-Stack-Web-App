const mongoose =require("mongoose")
const postSchema = new  mongoose.Schema({
    postUrl:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
    },
    isPublic:{
        type:Boolean,
        default:false
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
},{timestamps:true})
const Post =mongoose.model("Post",postSchema)
module.exports=Post