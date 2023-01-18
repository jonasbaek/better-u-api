import mongoose from "mongoose";
import userService from "../services/user.js";
import postService from "../services/posts.js";

//middlewares são funções de interceptações, entre a rota e o callback

export const validId = (req, res, next) => {
  try {
    let id = req.params.userId || req.params.postId;
    console.log(id);
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({ message: "Invalid ID" });
    }
    next();
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

export const validUser = async (req, res, next) => {
  try {
    const id = req.params.userId;
    const user = await userService.findByIdService(id);
    if (!user) {
      return res.status(400).send({ message: "User not found" });
    }
    req.userId = id;
    req.user = user;
    next();
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

export const validUserCreation = async (req, res, next) => {
  try {
    const { name, username, email, password } = req.body;
    if (!name || !username || !email || !password) {
      res.status(401).send({ error: "Submit all fields for registration" });
    }
    const user = await userService.createService(req.body);
    if (!user) {
      return res.status(400).send({ message: "Error creating user" });
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

export const validPost = async (req, res, next) => {
  try {
    const postId = req.params.postId;
    const post = await postService.findByIdService(postId);
    if (!post) {
      return res.status(400).send({ message: "Post not found" });
    }
    req.postId = postId;
    req.post = post;

    next();
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

export const validSameUser = async (req, res, next) => {
  try {
    const post = req.post;
    const currentUser = req.user;
    if (String(post.user._id) !== String(currentUser._id)) {
      return res.status(400).send({
        message: "This user is not allowed to update this post",
      });
    }
    next();
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
