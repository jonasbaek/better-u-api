const userService = require("../services/user");

const create = async (req, res) => {
  const { name, username, email, password, avatar, background } = req.body;
  if (!name || !username || !email || !password) {
    res.status(401).send({ error: "Submit all fields for registration" });
  }
  const user = await userService.create(req.body);
  if (!user) {
    return res.status(400).send({ message: "Error creating user" });
  }
  res.status(201).send({
    user: {
      id: user._id,
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
