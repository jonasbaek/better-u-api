import postsService from "../services/posts.js";

const create = async (req, res) => {
  try {
    const { title, text } = req.body;
    if (!title || !text) {
      res.status(400).send({
        message: "Submit all fields for registration",
      });
    }
    const post = await postsService.createService({
      title,
      text,
      user: req.user._id,
    });
    req.user.posts.push(post);
    await req.user.save();
    res.sendStatus(201);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const findAll = async (req, res) => {
  try {
    //pagination
    let { limit, offset } = req.query;
    limit = Number(limit);
    offset = Number(offset);
    if (!limit) {
      limit = 5;
    }
    if (!offset) {
      offset = 0;
    }
    const posts = await postsService.findAllService(limit, offset);
    const total = await postsService.countPosts();
    const currentUrl = req.baseUrl;

    const next = offset + limit;
    const nextUrl =
      next < total ? `${currentUrl}?limit=${limit}&offset=${next}` : null;

    const previous = offset - limit < 0 ? null : offset - limit;
    const previousUrl =
      previous != null
        ? `${currentUrl}?limit=${limit}&offset=${previous}`
        : null;

    //pagination
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
    const posts = await postsService.findByUserIdService(req.params.userId);
    res.send({
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

export const remove = async (req, res) => {
  try {
    const { postId } = req.params;
    await postsService.removeService(postId);
    return res.send({ message: "Post deleted successfully!" });
  } catch (error) {
    res.status("500").send(error.message);
  }
};

export const likePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const userId = req.user.id;
    const likedPost = await postsService.likePostService(postId, userId);
    if (!likedPost) {
      await postsService.deleteLikePostService(id, userId);
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
