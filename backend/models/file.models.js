const mongoose = require("mongoose")
const fileSchema= new mongoose.Schema({
  key:{
    type:String,
    required:true
  },
  size:Number,
  createdBy:{
    type:mongoose.Types.ObjectId,
    ref:"User"
  }
},{timestamps:true})
const File=mongoose.model("File",fileSchema)
module.exports=File