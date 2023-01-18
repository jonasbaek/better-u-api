import { Router } from "express";
import postsController from "../controllers/posts.js";
import { authMiddleware } from "../middlewares/auth.js";
import { validId, validPost } from "../middlewares/global.js";

const router = Router();

router.post("/", authMiddleware, postsController.create);
router.get("/", authMiddleware, postsController.findAll);
router.get("/user/:id", authMiddleware, postsController.findByUserId);
router.get(
  "/:id",
  authMiddleware,
  validId,
  validPost,
  postsController.findById
);
router.patch(
  "/:id",
  authMiddleware,
  validId,
  validPost,
  postsController.update
);

export default router;
