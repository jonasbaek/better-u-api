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
const updateService = (postId, text, image) =>
  Posts.findOneAndUpdate({ _id: postId }, { text, image });
const removeService = async (userId, postId) => {
  await User.findByIdAndUpdate(userId, {
    $pull: { posts: postId },
  });
  await Posts.findByIdAndDelete(postId);
};
const likePostService = async (postId, userId) => {
  const updatePostLike = await Posts.findOneAndUpdate(
    { _id: postId, "likes.user": { $nin: [userId] } },
    { $push: { likes: { user: userId } } }
  );
  if (updatePostLike) {
    return await User.findOneAndUpdate(
      { _id: userId, "likes.post": { $nin: [postId] } },
      { $push: { likes: { post: postId } } }
    );
  }
};
const deleteLikePostService = async (postId, userId) => {
  const deletePostLike = await Posts.findOneAndUpdate(
    { _id: postId },
    { $pull: { likes: { user: userId } } }
  );
  if (deletePostLike) {
    return await User.findOneAndUpdate(
      { _id: userId },
      { $pull: { likes: { post: postId } } }
    );
  }
};

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
