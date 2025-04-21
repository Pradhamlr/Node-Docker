const mongoose = require("mongoose")

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Provide Title For The Post"]
    },
    body: {
        type: String,
        required: [true, "Provide Body For The Post"]
    }
}, {timestamps: true})

module.exports = mongoose.model("Post", postSchema)