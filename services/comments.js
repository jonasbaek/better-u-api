import Comments from "../models/Comments.js";
import Posts from "../models/Posts.js";

const createService = async (body) => {
  const comment = await Comments.create(body);
  await Posts.findByIdAndUpdate(body.post, {
    $push: { comments: comment },
  });
};
const findAllService = (postId, limit, offset) =>
  Comments.find({ post: postId })
    .sort({ _id: -1 })
    .skip(offset)
    .limit(limit)
    .populate("user")
    .populate("post");
const findByIdService = (commentId) =>
  Comments.findById(commentId).populate("user").populate("post");
const updateService = (commentId, text) =>
  Comments.findOneAndUpdate({ _id: commentId }, { text });
const removeService = async (postId, commentId) => {
  await Posts.findByIdAndUpdate(postId, {
    $pull: { comments: { _id: commentId } },
  });
  await Comments.findOneAndDelete(commentId);
};
const countComments = (postId) => Comments.countDocuments({ post: postId });

export default {
  countComments,
  createService,
  findByIdService,
  findAllService,
  removeService,
  updateService,
};
