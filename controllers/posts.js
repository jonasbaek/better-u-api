import postsService from "../services/posts.js";

const create = async (req, res) => {
  try {
    const { title, text } = req.body;
    if (!title || !text) {
      res.status(400).send({
        message: "Submit all fields for registration",
      });
    }
    await postsService.createService({
      title,
      text,
      user: req.currentUser._id,
    });
    res.sendStatus(201);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const findAll = async (req, res) => {
  try {
    const { nextUrl, previousUrl, limit, offset, total } = req.pagination;
    const posts = await postsService.findAllService(limit, offset);
    res.send({
      nextUrl,
      previousUrl,
      limit,
      offset,
      total,
      posts: posts?.map((post) => ({
        id: post._id,
        title: post.title,
        text: post.text,
        likes: post.likes,
        comments: post.comments,
        image: post.image,
        user: {
          id: post.user._id,
          name: post.user.name,
          username: post.user.username,
          avatar: post.user.avatar,
        },
      })),
    });
  } catch (error) {
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
        title: post.title,
        text: post.text,
        likes: post.likes,
        comments: post.comments,
        image: post.image,
        user: {
          name: post.user.name,
          username: post.user.username,
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
    const { title, text, image } = req.body;
    if (!title || !text) {
      res.status(401).send({ message: "Missing fields!" });
    }
    const { postId } = req.params;
    await postsService.updateService(postId, title, text, image);
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
    await postsService.removeService(req.currentUser._id, postId);
    return res.send({ message: "Post deleted successfully!" });
  } catch (error) {
    res.status("500").send(error.message);
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
      await postsService.deleteLikePostService(id, req.currentUser._id);
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
