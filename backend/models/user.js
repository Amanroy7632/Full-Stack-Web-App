const mongoose = require('mongoose')
const userSchema = mongoose.Schema({
 name:{
    type:String,
    required:true,
 },
 email:{
    type:String,
    required:true,
    trim:true,
    unique:true
 },
 password:{
    type:String,
    required:true,
    minlength:6
 },
//  1->Admin 2->subadmin 3->Normal user 
 role:{
    type:Number,
    default:3
 },
 verificationCode:{
   type:String
 },
 isVerified:{
   type:Boolean,
   default:false
 },
 forgetPasswordCode:{
   type:String
 }
},{timestamps:true})
const User =mongoose.model("User",userSchema)
module.exports = User