import Comments from "../models/Comments.js";
import Posts from "../models/Posts.js";
import User from "../models/User.js";

const createService = (body) => User.create(body);
const findAllService = () => User.find();
const findByIdService = (userId) => User.findById(userId);
const updateService = (
  userId,
  name,
  username,
  email,
  password,
  avatar,
  background
) =>
  User.findOneAndUpdate(
    { _id: userId },
    { name, username, email, password, avatar, background }
  );
const removeService = async (userId) => {
  await Posts.remove({ user: userId });
  const posts = await Posts.find({ user: userId });
  const postIds = posts.map((post) => post._id);
  await Comments.remove({ post: { $in: postIds } });
  await User.findByIdAndDelete(userId);
};

export default {
  createService,
  findAllService,
  findByIdService,
  removeService,
  updateService,
};
