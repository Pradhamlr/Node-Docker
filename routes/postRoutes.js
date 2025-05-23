const { getAllPosts, createPost, getPost, updatePost, deletePost } = require("../controllers/post") 

const express = require("express")
const router = express.Router()

router.route("/").get(getAllPosts).post(createPost)

router.route("/:id").get(getPost).patch(updatePost).delete(deletePost)

module.exports = router