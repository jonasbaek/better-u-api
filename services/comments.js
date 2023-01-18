import Comments from "../models/Comments.js";

const createService = (body) => Comments.create(body);
const findAllService = (postId, limit, offset) =>
  Comments.find({ post: postId })
    .sort({ _id: -1 })
    .skip(offset)
    .limit(limit)
    .populate("user")
    .populate("post");
const findByIdService = (commentId) =>
  Comments.findById(commentId).populate("user");
const updateService = (commentId, text) =>
  Comments.findOneAndUpdate({ _id: commentId }, { text });
const countComments = (postId) => Comments.countDocuments({ post: postId });

export default {
  countComments,
  createService,
  findByIdService,
  findAllService,
  updateService,
};
