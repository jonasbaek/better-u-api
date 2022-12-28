const create = (req, res) => {
  const { name, username, email, password, avatar, background } = req.body;
  if (!name || !username || !email || !password) {
    res.status(401).send({ error: "Submit all fields for registration" });
  }
  res.status(201).send({
    user: {
      name,
      username,
      email,
      avatar,
      background,
    },
    message: "User created successfully",
  });
};

module.exports = { create };
