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
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      createdAt: {
        type: Date,
        default: Date.now(),
      },
    },
  ],
  comments: [
    {
      comment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comments",
      },
    },
  ],
  image: {
    type: String,
  },
});

const Posts = mongoose.model("Posts", PostsSchema);

export default Posts;
