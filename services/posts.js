import Posts from "../models/Posts.js";
import User from "../models/User.js";

const createService = async (body) => {
  const post = await Posts.create(body);
  await User.findByIdAndUpdate(body.user, {
    $push: { posts: post },
  });
};
const findAllService = (limit, offset) =>
  Posts.find()
    .sort({ _id: -1 })
    .skip(offset)
    .limit(limit)
    .populate("user")
    .populate("comments");
const findByIdService = (postId) =>
  Posts.findById(postId).populate("user").populate("comments");
const findByUserIdService = (userId) =>
  Posts.find({ user: userId }).populate("user").populate("comments");
const updateService = (postId, title, text, image) =>
  Posts.findOneAndUpdate({ _id: postId }, { title, text, image });
const removeService = async (userId, postId) => {
  await User.findByIdAndUpdate(userId, {
    $pull: { posts: postId },
  });
  await Posts.findByIdAndDelete(postId);
};
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
