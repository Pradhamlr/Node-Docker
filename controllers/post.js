const Post = require("../model/postModel")

const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find()
        res.status(200).json({ 
            status: "Success",
            count: posts.length,
            data: {
                posts
            }
        })
    } catch (error) {
        res.status(400).json({
            status: "Fail"
        })
    }
}

const getPost = async (req, res) => {
    try {
        const {params: {id: PostID}} = req
        const post = await Post.findOne({ _id: PostID })
        res.status(200).json({
            status: "Success",
            data: {
                post
            }
        })
    } catch (error) {
        res.status(400).json({
            status: "Fail"
        })
    }
}

const createPost = async (req, res) => {
    try {
        const post = await Post.create({ ...req.body })
        res.status(200).json({
            status: "Success",
            data: {
                post
            }
        })
    } catch (error) {
        res.status(400).json({
            status: "Fail"
        })
    }
}

const updatePost = async (req, res) => {
    try {
        const {params: {id: PostID}} = req
        const post = await Post.findOneAndUpdate({ _id: PostID }, req.body, {
            new: true,
            runValidators: true
        })
        res.status(200).json({
            status: "Success",
            data: {
                post
            }
        })
    } catch (error) {
        res.status(400).json({
            status: "Fail"
        })
    }
}

const deletePost = async (req, res) => {
    try {
        const {params: {id: PostID}} = req
        const post = await Post.findOneAndDelete({ _id: PostID })
        res.status(200).json({
            status: "Success"
        })
    } catch (error) {
        res.status(400).json({
            status: "Fail"
        })
    }
}

module.exports = { getAllPosts, getPost, createPost, deletePost, updatePost } 