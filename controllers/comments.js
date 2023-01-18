import commentsService from "../services/comments.js";

const create = async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) {
      res.status(400).send({
        message: "Missing text field!",
      });
    }
    const comment = await commentsService.createService({
      text,
      user: req.user._id,
      post: req.postId,
    });
    req.post.comments.push(comment);
    await req.post.save();
    res.sendStatus(201);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export default { create };
