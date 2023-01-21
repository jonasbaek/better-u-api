import Comments from "../models/Comments.js";
import Posts from "../models/Posts.js";
import User from "../models/User.js";

const createService = (body) => User.create(body);
const findAllService = () => User.find().populate("friends.user");
const findByName = (name) =>
  User.find({ name: { $regex: name, $options: "i" } });
const findByIdService = (userId) =>
  User.findById(userId).populate("friends.user");
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

const addFriendService = async (currentUserId, friendId) => {
  const addToCurrentUser = await User.findOneAndUpdate(
    { _id: currentUserId, "friends.user": { $nin: [friendId] } },
    { $push: { friends: { user: friendId } } }
  );
  if (addToCurrentUser) {
    return await User.findOneAndUpdate(
      { _id: friendId },
      { $push: { friends: { user: currentUserId } } }
    );
  }
  return addToCurrentUser;
};

const deleteFriendService = async (currentUserId, friendId) => {
  const deleteToCurrentUser = await User.findOneAndUpdate(
    { _id: currentUserId },
    { $pull: { friends: { user: friendId } } }
  );
  if (deleteToCurrentUser) {
    return await User.findOneAndUpdate(
      { _id: friendId },
      { $pull: { friends: { user: currentUserId } } }
    );
  }
  return deleteToCurrentUser;
};

const removeService = async (userId) => {
  await Posts.remove({ user: userId });
  const posts = await Posts.find({ user: userId });
  const postIds = posts.map((post) => post._id);
  await Comments.remove({ post: { $in: postIds } });
  await User.findByIdAndDelete(userId);
};

export default {
  addFriendService,
  createService,
  deleteFriendService,
  findAllService,
  findByName,
  findByIdService,
  removeService,
  updateService,
};
