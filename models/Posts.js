import mongoose from "mongoose";

const PostsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    maxlength: [100, "Title must be less than 100 characters"],
  },
  text: {
    type: String,
    required: true,
    maxlength: [5000, "Text must be less than 5000 characters"],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  comments: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      text: {
        type: String,
        required: true,
        maxlength: [1000, "Comment text must be less than 1000 characters"],
      },
      createdAt: {
        type: Date,
        default: Date.now(),
      },
    },
  ],
  image: {
    type: String,
  },
});

const Posts = mongoose.model("Posts", PostsSchema);

export default Posts;
