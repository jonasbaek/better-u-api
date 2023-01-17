import userService from "../services/user.js";

const create = async (req, res) => {
  try {
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
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const findAll = async (req, res) => {
  try {
    const users = await userService.findAllService();
    if (users.length === 0) {
      return res.status(400).send({ message: "Users not found" });
    }
    res.send(users);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const findById = async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const update = async (req, res) => {
  try {
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
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

export default { create, findAll, findById, update };
