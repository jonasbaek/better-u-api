import Posts from "../models/Posts.js";

const createService = (body) => Posts.create(body);
const findAllService = (limit, offset) =>
  Posts.find().sort({ _id: -1 }).skip(offset).limit(limit).populate("user"); //_id: -1 traz todos os posts recentes, e o populate vai popular o user com todos os atributos dele
const findByIdService = (id) => Posts.findById(id).populate("user");
const findByUserIdService = (id) => Posts.find({ user: id }).populate("user");
const updateService = (id, title, text, image) =>
  Posts.findOneAndUpdate({ _id: id }, { title, text, image });
const removeService = (id) => Posts.findByIdAndDelete(id);
const countPosts = () => Posts.countDocuments();

export default {
  createService,
  findAllService,
  findByIdService,
  findByUserIdService,
  countPosts,
  updateService,
  removeService,
};
