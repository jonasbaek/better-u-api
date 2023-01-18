import { Router } from "express";
import postsController from "../controllers/posts.js";
import { authMiddleware } from "../middlewares/auth.js";
import { validId, validPost, validSameUser } from "../middlewares/global.js";

const router = Router();

router.post("/", authMiddleware, postsController.create);
router.get("/", authMiddleware, postsController.findAll);
router.get(
  "/user/:userId",
  validId,
  authMiddleware,
  postsController.findByUserId
);
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
  validSameUser,
  postsController.update
);
router.delete(
  "/:id",
  authMiddleware,
  validId,
  validPost,
  validSameUser,
  postsController.remove
);
router.patch(
  "/like/:id",
  authMiddleware,
  validId,
  validPost,
  postsController.likePost
);

export default router;
