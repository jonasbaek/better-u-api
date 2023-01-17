const userService = require("../services/user");
const mongoose = require("mongoose");

const create = async (req, res) => {
  const { name, username, email, password, avatar, background } = req.body;
  if (!name || !username || !email || !password) {
    res.status(401).send({ error: "Submit all fields for registration" });
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
    message: "User successfully created!",
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
  const user = req.user;

  res.send(user);
};

const update = async (req, res) => {
  const { name, username, email, password, avatar, background } = req.body;
  if (!name && !username && !email && !password) {
    res.status(401).send({ error: "Submit at least one field for update" });
  }
  const { id, user } = req;

  await userService.updateService(
    id,
    name,
    username,
    email,
    password,
    avatar,
    background
  );

  res.status(201).send({
    message: "User successfully updated!",
  });
};

module.exports = { create, findAll, findById, update };
