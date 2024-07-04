const express = require("express")
const {isAuth, upload} = require("../middlewares/index.js")
const {postController} = require("../controllers/index.js")
const router =express.Router()
router.post("/add-post",isAuth,upload.single('avatar'),postController.createPost)
router.get("/post/:postId",postController.getSinglePost)
router.get("/posts/all-post",isAuth,postController.getAllPosts)
router.put("/post/update-post/:postId",isAuth,upload.single('avatar'),postController.updatePost)
router.delete("/delete-post/:postId",isAuth,postController.deletePost)
router.delete("/delete-all-post",isAuth,postController.deleteAllPost)

module.exports =router