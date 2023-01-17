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

    if (posts.length === 0) {
      res.status(400).send({
        message: "There are no posts!",
      });
    }
    res.send({
      nextUrl,
      previousUrl,
      limit,
      offset,
      total,
      results: posts.map((post) => ({
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
        posts: post.posts,
      })),
    });
  } catch (error) {
    res.status("500").send(error.message);
  }
};

export default { create, findAll };
