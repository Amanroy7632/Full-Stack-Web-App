const http=require("http")
const app=require("./app")
const {port}=require("./constants/keys.js")

// create a server 
const server =http.createServer(app)
// listen the server 
server.listen(port,()=>{
    console.log(`Server listening on port ${port}`);
})

