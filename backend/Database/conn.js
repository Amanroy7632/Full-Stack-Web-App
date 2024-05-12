const mongoose =require("mongoose")
const {connectionUrl}=require("../constants/keys.js")
const connectFromMongoDb=async()=>{
    try {
        await mongoose.connect(`${connectionUrl}/videodb`)
        console.log(`Database Connected Successfully with mongoose.`)
    } catch (error) {
        console.log(`Error connecting to Mongo database: ${error.message}`);
    }
}
module.exports=connectFromMongoDb