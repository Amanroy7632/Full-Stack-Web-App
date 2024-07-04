const express =require("express")
const { isAuth } = require("../middlewares")
const { likeController } = require("../controllers")
const router = express.Router()
router.get("/toggle/p/:postId",isAuth,likeController.likePost)
module.exports =router