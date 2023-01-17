import mongoose from "mongoose";
import userService from "../services/user.js";

//middlewares são funções de interceptações, entre a rota e o callback

export const validId = (req, res, next) => {
  try {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({ message: "Invalid ID" });
    }

    next(); //serve para dar prosseguimento após o middleware ser executado
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

export const validUser = async (req, res, next) => {
  try {
    const id = req.params.id;
    const user = await userService.findByIdService(id);
    if (!user) {
      return res.status(400).send({ message: "User not found" });
    }
    req.id = id;
    req.user = user;

    next();
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

export const validUserCreation = async (req, res, next) => {
  try {
    const { name, username, email, password } = req.body;
    if (!name || !username || !email || !password) {
      res.status(401).send({ error: "Submit all fields for registration" });
    }
    const user = await userService.createService(req.body);
    if (!user) {
      return res.status(400).send({ message: "Error creating user" });
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
