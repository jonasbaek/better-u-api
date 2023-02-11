import jwt from "jsonwebtoken";
import userService from "../services/user.js";

export const authMiddleware = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).send({ message: "Missing token" });
  }

  const [, token] = authorization.split(" ");

  try {
    const decoded = jwt.verify(token, process.env.SECRET_JWT);
    const user = await userService.findByIdService(decoded.id);
    if (!user) {
      return res.status(401).send({ message: "Invalid token" });
    }
    req.currentUser = user;
  } catch (error) {
    return res.status(401).send({ message: "Invalid token" });
  }

  next();
};
