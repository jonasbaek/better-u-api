import { Router } from "express";
import postsController from "../controllers/posts.js";
import { authMiddleware } from "../middlewares/auth.js";
import { createRateLimiter } from "../middlewares/rateLimit.js";
import { validId, validPost, validSameUser } from "../middlewares/global.js";
import { postsPaginationMiddleware } from "../middlewares/pagination.js";

const router = Router();

router.post(
  "/",
  authMiddleware,
  createRateLimiter(60 * 1000, 10, "Too many posts, please try again later."),
  postsController.create
);
router.get(
  "/",
  authMiddleware,
  postsPaginationMiddleware,
  postsController.findAll
);
router.get(
  "/user/:userId",
  authMiddleware,
  validId,
  postsPaginationMiddleware,
  postsController.findByUserId
);
router.get(
  "/:postId",
  authMiddleware,
  validId,
  validPost,
  postsController.findById
);
router.patch(
  "/:postId",
  authMiddleware,
  validId,
  validPost,
  validSameUser,
  postsController.update
);
router.delete(
  "/:postId",
  authMiddleware,
  validId,
  validPost,
  validSameUser,
  postsController.remove
);
router.patch(
  "/like/:postId",
  authMiddleware,
  validId,
  validPost,
  postsController.likePost
);

export default router;
