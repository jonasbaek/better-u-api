import Posts from "../models/Posts.js";

const createService = (body) => Posts.create(body);
const findAllService = (limit, offset) =>
  Posts.find().sort({ _id: -1 }).skip(offset).limit(limit).populate("user");
const findByIdService = (postId) => Posts.findById(postId).populate("user");
const findByUserIdService = (userId) =>
  Posts.find({ user: userId }).populate("user");
const updateService = (postId, title, text, image) =>
  Posts.findOneAndUpdate({ _id: postId }, { title, text, image });
const removeService = (postId) => Posts.findByIdAndDelete(postId);
const likePostService = (postId, userId) =>
  Posts.findOneAndUpdate(
    { _id: postId, "likes.user": { $nin: [userId] } },
    { $push: { likes: { user: userId } } }
  );
const deleteLikePostService = (postId, userId) =>
  Posts.findOneAndUpdate(
    { _id: postId },
    { $pull: { likes: { user: userId } } }
  );
const countPosts = () => Posts.countDocuments();

export default {
  countPosts,
  createService,
  deleteLikePostService,
  findAllService,
  findByIdService,
  findByUserIdService,
  likePostService,
  removeService,
  updateService,
};
