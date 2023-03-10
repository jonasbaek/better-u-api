import mongoose from "mongoose";

const PostsSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
    maxlength: [2000, "Text must be less than 2000 characters"],
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
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comments",
    },
  ],
  image: {
    type: String,
  },
});

const Posts = mongoose.model("Posts", PostsSchema);

export default Posts;
