import { Router } from "express";
import commentsController from "../controllers/comments.js";
import { authMiddleware } from "../middlewares/auth.js";
import { validId, validPost, validSameUser } from "../middlewares/global.js";

const router = Router();

router.post("/", authMiddleware, commentsController.create);

export default router;
