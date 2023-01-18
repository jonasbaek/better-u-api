import Comments from "../models/Comments.js";

const createService = (body) => Comments.create(body);

export default {
  createService,
};
