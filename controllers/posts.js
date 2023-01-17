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
      id: "testeId",
    });
    res.send(201);
  } catch (error) {
    res.status("500").send(error.message);
  }
};

const getAll = async (req, res) => {
  try {
    const posts = await postsService.findAllService();
    if (posts.length === 0) {
      res.status(400).send({
        message: "There are no posts!",
      });
    }
    res.send(posts);
  } catch (error) {
    res.status("500").send(error.message);
  }
};

export default { create, getAll };
