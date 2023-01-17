import Posts from "../models/Posts.js";

const createService = (body) => Posts.create(body);
const findAllService = () => Posts.find();

export default {
  createService,
  findAllService,
};
