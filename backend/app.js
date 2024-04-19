const express =require("express")
const bodyParser=require("body-parser")
const {errorHandler}=require("./middlewares/index.js")
const {authRoute,categoryRoute,fileRoute} =require("./routes/index.js")
// const cors=require("cors")
const dotenv=require("dotenv")
// consfigure the dotenv file 
dotenv.config()
const connectFromMongoDb =require("./Database/conn.js")
// create an app 
const app=express()
// connect from mongo database 
connectFromMongoDb()
// use middleware with specific size 
app.use(express.json({limit:"500mb"}))
app.use(bodyParser.urlencoded({limit:"500mb",extended:true}))
app.use("/api/v1/auth",authRoute)
app.use("/api/v1/category",categoryRoute)
app.use("/api/v1/file",fileRoute)
// if no routes matches then handle using *
const notFound =require("./controllers/notFound.js")
app.use("*",notFound)
// error handling middleware 
app.use(errorHandler)
module.exports=app