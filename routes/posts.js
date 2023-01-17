import { Router } from "express";
import postsController from "../controllers/posts.js";
import { authMiddleware } from "../middlewares/auth.js";

const router = Router();

router.post("/", authMiddleware, postsController.create);
router.get("/", authMiddleware, postsController.findAll);

export default router;
