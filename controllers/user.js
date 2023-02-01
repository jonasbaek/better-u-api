import userService from "../services/user.js";

const create = async (req, res) => {
  try {
    const { name, email, avatar, description } = req.body;
    res.status(201).send({
      user: {
        id: req.user._id,
        name,
        email,
        avatar,
        description,
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

const findByName = async (req, res) => {
  try {
    const { name } = req.params;
    if (!name) {
      res.status(401).send({ message: "Field is missing" });
    }
    const user = await userService.findByName(name);
    res.send(user);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const update = async (req, res) => {
  try {
    const { name, email, password, avatar, description } = req.body;
    if (!name && !email && !password && !description) {
      res.status(401).send({ error: "Submit at least one field for update" });
    }
    const { userId } = req;

    await userService.updateService(
      userId,
      name,
      email,
      password,
      avatar,
      description
    );

    res.status(201).send({
      message: "User successfully updated!",
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const remove = async (req, res) => {
  try {
    await userService.removeService(req.params.userId);
    res.send({ message: "User deleted successfully!" });
  } catch (error) {
    res.status("500").send(error.message);
  }
};

const addFriend = async (req, res) => {
  try {
    const addFriend = await userService.addFriendService(
      req.currentUser.id,
      req.userId
    );
    console.log(addFriend);
    if (!addFriend) {
      await userService.deleteFriendService(req.currentUser.id, req.userId);
      return res.status(200).send({ message: "Unfriended!" });
    }
    return res.status(201).send({
      message: "Friend successfully added!",
    });
  } catch (error) {
    console.log(error.message);
    return res.status("500").send(error.message);
  }
};

export default {
  addFriend,
  create,
  findAll,
  findByName,
  findById,
  remove,
  update,
};
