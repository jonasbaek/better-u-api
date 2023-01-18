import Comments from "../models/Comments.js";

const createService = (body) => Comments.create(body);
const findAllService = (limit, offset) =>
  Comments.find().sort({ _id: -1 }).skip(offset).limit(limit).populate("user");
const countComments = () => Comments.countDocuments();

export default {
  createService,
  findAllService,
  countComments,
};
