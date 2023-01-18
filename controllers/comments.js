import commentsService from "../services/comments.js";

const create = async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) {
      res.status(400).send({
        message: "Missing text field!",
      });
    }
    await commentsService.createService({
      text,
      user: req.currentUser._id,
      post: req.post._id,
    });
    res.sendStatus(201);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const findAll = async (req, res) => {
  try {
    const { nextUrl, previousUrl, limit, offset, total } = req.pagination;
    const comments = await commentsService.findAllService(
      req.postId,
      limit,
      offset
    );
    res.send({
      nextUrl,
      previousUrl,
      limit,
      offset,
      total,
      comments: comments?.map((comment) => ({
        id: comment._id,
        text: comment.text,
        likes: comment.likes,
        user: {
          id: comment.user._id,
          name: comment.user.name,
          username: comment.user.username,
          avatar: comment.user.avatar,
        },
        post: comment.post,
      })),
    });
  } catch (error) {
    res.status("500").send(error.message);
  }
};

const findById = async (req, res) => {
  try {
    const comment = req.comment;
    res.send(comment);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const update = async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) {
      res.status(401).send({ message: "Missing fields!" });
    }
    const { commentId } = req.params;
    await commentsService.updateService(commentId, text);
    res.status(201).send({
      message: "Post successfully updated!",
    });
  } catch (error) {
    res.status("500").send(error.message);
  }
};

const remove = async (req, res) => {
  try {
    const { commentId } = req.params;
    const { postId } = req;
    await commentsService.removeService(postId, commentId);
    return res.send({ message: "Comment deleted successfully!" });
  } catch (error) {
    res.status("500").send(error.message);
  }
};

export default { create, findAll, findById, update, remove };
