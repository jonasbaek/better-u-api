import Posts from "../models/Posts.js";

const createService = (body) => Posts.create(body);
const findAllService = (limit, offset) =>
  Posts.find().sort({ _id: -1 }).skip(offset).limit(limit).populate("user"); //_id: -1 traz todos os posts recentes, e o populate vai popular o user com todos os atributos dele
const countPosts = () => Posts.countDocuments();

export default {
  createService,
  findAllService,
  countPosts,
};
