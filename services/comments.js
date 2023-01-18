import Comments from "../models/Comments.js";

const createService = (body) => Comments.create(body);
const findAllService = (limit, offset) =>
  Comments.find().sort({ _id: -1 }).skip(offset).limit(limit).populate("user");
const findByIdService = (commentId) =>
  Comments.findById(commentId).populate("user");
const updateService = (commentId, text) =>
  Comments.findOneAndUpdate({ _id: commentId }, { text });
const countComments = () => Comments.countDocuments();

export default {
  countComments,
  createService,
  findByIdService,
  findAllService,
  updateService,
};
