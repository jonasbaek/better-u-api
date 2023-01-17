const mongoose = require("mongoose");
const userService = require("../services/user");

//middlewares são funções de interceptações, entre a rota e o callback

const validId = (req, res, next) => {
  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({ message: "Invalid ID" });
  }

  next(); //serve para dar prosseguimento após o middleware ser executado
};

const validUser = async (req, res, next) => {
  const id = req.params.id;
  const user = await userService.findByIdService(id);
  if (!user) {
    return res.status(400).send({ message: "User not found" });
  }
  req.id = id;
  req.user = user;

  next();
};

module.exports = { validId, validUser };
