const mongoose =require("mongoose")
const categorySchema=mongoose.Schema(
{
 title:{
    type:String,
    required:true
 },
 description:String,
 updatedBy:{
    type:mongoose.Types.ObjectId,
    ref:"User",
    required:true
 }
},{timestamps:true})
const Category=mongoose.model("Category",categorySchema)
module.exports=Category