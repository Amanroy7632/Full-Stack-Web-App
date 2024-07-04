const mongoose = require('mongoose')
const commentSchema = new  mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post"
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
},{timestamps:true})