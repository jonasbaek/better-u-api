const User = require("../models/User");

//User.create -> create,find, findById are from moongose
const createService = (body) => User.create(body);
const findAllService = () => User.find();
const findByIdService = (id) => User.findById(id);

module.exports = {
  createService,
  findAllService,
  findByIdService,
};
