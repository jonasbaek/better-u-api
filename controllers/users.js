const userService = require("../services/user");
const mongoose = require("mongoose");

const create = async (req, res) => {
  const { name, username, email, password, avatar, background } = req.body;
  if (!name || !username || !email || !password) {
    res.status(401).send({ error: "Submit all fields for registration" });
  }
  const user = await userService.createService(req.body);
  if (!user) {
    return res.status(400).send({ message: "Error creating user" });
  }
  res.status(201).send({
    user: {
      id: user._id,
      name,
      username,
      email,
      avatar,
      background,
    },
    message: "User created succes sfully",
  });
};

const findAll = async (req, res) => {
  const users = await userService.findAllService();
  if (users.length === 0) {
    return res.status(400).send({ message: "Users not found" });
  }
  res.send(users);
};

const findById = async (req, res) => {
  //params is getting from route url
  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({ message: "Invalid ID" });
  }
  const user = await userService.findByIdService(id);
  if (!user) {
    return res.status(400).send({ message: "User not found" });
  }
  res.send(user);
};

module.exports = { create, findAll, findById };
