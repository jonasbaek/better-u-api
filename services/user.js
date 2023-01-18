import User from "../models/User.js";

//User.create -> create,find, findById are from moongose
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
const removeService = (userId) => User.findByIdAndDelete(userId);

export default {
  createService,
  findAllService,
  findByIdService,
  removeService,
  updateService,
};
