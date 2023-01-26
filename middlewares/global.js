import mongoose from "mongoose";
import userService from "../services/user.js";
import postsService from "../services/posts.js";
import commentsService from "../services/comments.js";

export const validId = (req, res, next) => {
  try {
    let id = req.params.userId || req.params.postId || req.params.commentId;
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
    const post = await postsService.findByIdService(postId);
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

export const validComment = async (req, res, next) => {
  try {
    const commentId = req.params.commentId;
    const comment = await commentsService.findByIdService(commentId);
    if (!comment) {
      return res.status(400).send({ message: "Comment not found" });
    }
    req.commentId = commentId;
    req.comment = comment;

    next();
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

export const validSamePostUser = async (req, res, next) => {
  try {
    const post = req.post;
    const currentUser = req.currentUser;
    if (String(post.user._id) !== String(currentUser._id)) {
      return res.status(400).send({
        message: "This user is not allowed to make this action!",
      });
    }
    next();
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

export const validSameCommentUser = async (req, res, next) => {
  try {
    const comment = req?.comment;
    const currentUser = req.currentUser;
    if (String(comment.user._id) !== String(currentUser._id)) {
      return res.status(400).send({
        message: "This user is not allowed to make this action!",
      });
    }
    next();
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

export const validUserRemoveAccount = async (req, res, next) => {
  try {
    const currentUser = req.currentUser;
    if (String(req.params.userId) !== String(currentUser._id)) {
      return res.status(400).send({
        message: "This user is not allowed to make this action!",
      });
    }
    next();
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
