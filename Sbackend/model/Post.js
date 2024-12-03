// models/Post.js

const mongoose = require('mongoose');

// Define the schema
const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true, // Title is mandatory
        trim: true,     // Removes extra spaces
    },
    file: String,
    content: {
        type: String,
        required: true, // Content is mandatory
        trim: true,
    },
    likes: {
        type: Number,
        default: 0,
        min: 0,         // Ensure likes are non-negative
    },
    comments: [
        {
            text: {
                type: String,
                required: true, // Each comment must have text
                trim: true,
            },
        },
    ],
}, { timestamps: true }); // Adds createdAt and updatedAt fields automatically

// Create the model
const Post = mongoose.model('Post', postSchema);

// Export the model
module.exports = Post;
