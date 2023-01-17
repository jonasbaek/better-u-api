import { Router } from "express";
import postsController from "../controllers/posts.js";
import { authMiddleware } from "../middlewares/auth.js";

const router = Router();

router.post("/", authMiddleware, postsController.create);
router.get("/", authMiddleware, postsController.findAll);
router.get("/user/:id", authMiddleware, postsController.findByUserId);

export default router;
