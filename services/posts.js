import Posts from "../models/Posts.js";

const createService = (body) => Posts.create(body);
const findAllService = (limit, offset) =>
  Posts.find().sort({ _id: -1 }).skip(offset).limit(limit).populate("user");
const findByIdService = (id) => Posts.findById(id).populate("user");
const findByUserIdService = (id) => Posts.find({ user: id }).populate("user");
const updateService = (id, title, text, image) =>
  Posts.findOneAndUpdate({ _id: id }, { title, text, image });
const removeService = (id) => Posts.findByIdAndDelete(id);
const likePostService = (postId, userId) =>
  Posts.findOneAndUpdate(
    { _id: postId, "likes.userId": { $nin: [userId] } },
    { $push: { likes: { userId, createdAt: new Date() } } }
  );
const deleteLikePostService = (postId, userId) =>
  Posts.findOneAndUpdate({ _id: postId }, { $pull: { likes: { userId } } });
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
