import jwt from "jsonwebtoken";
import userService from "../services/user.js";

export const authMiddleware = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      return res.sendStatus(401);
    }
    const parts = authorization.split(" ");
    const [schema, token] = parts;
    if (schema !== "Bearer") {
      return res.sendStatus(401);
    }
    jwt.verify(token, process.env.SECRET_JWT, async (error, decoded) => {
      if (error) {
        return res.status(401).send({ message: "Invalid Token!" });
      }
      const user = await userService.findByIdService(decoded.id);
      if (!user || !user.id) {
        return res.status(401).send({ message: "Invalid token!" });
      }
      req.userId = user._id;
      return next();
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
};
