import postsService from "../services/posts.js";
import fs from "fs";

const create = async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) {
      res.status(400).send({
        message: "Submit all fields for registration",
      });
    }
    await postsService.createService({
      text,
      image: req.file ? req.file.filename : null,
      user: req.currentUser._id,
    });
    res.sendStatus(201);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const findAll = async (req, res) => {
  try {
    const { nextUrl, limit, total } = req.pagination;
    const posts = await postsService.findAllService(limit);
    res.send({
      nextUrl,
      limit,
      total,
      posts: posts?.map((post) => ({
        id: post._id,
        createdAt: post.createdAt,
        text: post.text,
        likes: post.likes,
        comments: post.comments,
        image: post.image,
        user: {
          id: post.user._id,
          name: post.user.name,
          description: post.user.description,
          avatar: post.user.avatar,
          friends: post.user.friends,
        },
      })),
    });
  } catch (error) {
    console.log(error);
    res.status("500").send(error.message);
  }
};

const findById = async (req, res) => {
  try {
    const post = req.post;
    res.send(post);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const findByUserId = async (req, res) => {
  try {
    const { nextUrl, previousUrl, limit, offset, total } = req.pagination;

    const posts = await postsService.findByUserIdService(req.params.userId);
    res.send({
      nextUrl,
      previousUrl,
      limit,
      offset,
      total,
      posts: posts?.map((post) => ({
        id: post._id,
        text: post.text,
        likes: post.likes,
        comments: post.comments,
        image: post.image,
        user: {
          name: post.user.name,
          avatar: post.user.avatar,
        },
      })),
    });
  } catch (error) {
    res.status("500").send(error.message);
  }
};

const update = async (req, res) => {
  try {
    const { text, image } = req.body;
    if (!text) {
      res.status(401).send({ message: "Missing fields!" });
    }
    const { postId } = req.params;
    await postsService.updateService(postId, text, image);
    res.status(201).send({
      message: "Post successfully updated!",
    });
  } catch (error) {
    res.status("500").send(error.message);
  }
};

const remove = async (req, res) => {
  try {
    const { postId } = req.params;
    const { image } = req.post;
    if (image) {
      fs.unlink(`public/uploads/${image}`, (error) => {
        if (error) {
          return res.status(500).send({ message: error.message });
        }
      });
    }
    await postsService.removeService(req.currentUser._id, postId);
    return res.send({ message: "Post deleted successfully!" });
  } catch (error) {
    return res.status("500").send(error.message);
  }
};

const likePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const likedPost = await postsService.likePostService(
      postId,
      req.currentUser._id
    );
    if (!likedPost) {
      await postsService.deleteLikePostService(postId, req.currentUser._id);
      return res.status(200).send({ message: "Post has been disliked!" });
    }

    return res.send({ message: "Post has been liked!" });
  } catch (error) {
    res.status("500").send(error.message);
  }
};

export default {
  create,
  findAll,
  findById,
  findByUserId,
  likePost,
  remove,
  update,
};
