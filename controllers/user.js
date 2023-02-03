import userService from "../services/user.js";
import fs from "fs";

const create = async (req, res) => {
  try {
    const { name, email, avatar, description } = req.body;
    return res.status(201).send({
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
    return res.status(500).send({ message: error.message });
  }
};

const findAll = async (req, res) => {
  try {
    const users = await userService.findAllService();
    if (users.length === 0) {
      return res.status(400).send({ message: "Users not found" });
    }
    return res.send(users);
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

const findById = async (req, res) => {
  try {
    const user = req.user;
    return res.send(user);
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

const findByName = async (req, res) => {
  try {
    const { name } = req.params;
    if (!name) {
      return res.status(401).send({ message: "Field is missing" });
    }
    const user = await userService.findByName(name);
    return res.send(user);
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

const update = async (req, res) => {
  try {
    const { name, password, image, description } = req.body;
    if (!name && !password && !description && !image) {
      return res
        .status(401)
        .send({ error: "Submit at least one field for update" });
    }
    const { userId, user } = req;
    if (req.file && user?.avatar) {
      fs.unlink(`public/uploads/avatars/${user.avatar}`, (error) => {
        if (error) {
          return res.status(500).send({ message: error.message });
        }
      });
    }
    const defineAvatar = () => {
      if (req.file) {
        return req.file.filename;
      } else if (user.avatar) {
        return user.avatar;
      }
      return null;
    };
    await userService.updateService(
      userId,
      name,
      password,
      defineAvatar(),
      description
    );
    return res.status(201).send({
      message: "User successfully updated!",
    });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

const remove = async (req, res) => {
  try {
    await userService.removeService(req.params.userId);
    return res.send({ message: "User deleted successfully!" });
  } catch (error) {
    return res.status("500").send(error.message);
  }
};

const addFriend = async (req, res) => {
  try {
    const addFriend = await userService.addFriendService(
      req.currentUser.id,
      req.userId
    );
    if (!addFriend) {
      await userService.deleteFriendService(req.currentUser.id, req.userId);
      return res.status(200).send({ message: "Unfriended!" });
    }
    return res.status(201).send({
      message: "Friend successfully added!",
    });
  } catch (error) {
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
