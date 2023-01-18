import { Router } from "express";
import commentsController from "../controllers/comments.js";
import { authMiddleware } from "../middlewares/auth.js";
import { createRateLimiter } from "../middlewares/rateLimit.js";
import { commentsPaginationMiddleware } from "../middlewares/pagination.js";
import {
  validId,
  validComment,
  validSameCommentUser,
} from "../middlewares/global.js";

const router = Router();

router.post(
  "/",
  authMiddleware,
  createRateLimiter(
    60 * 1000,
    30,
    "Too many comments, please try again later."
  ),
  commentsController.create
);
router.get(
  "/",
  authMiddleware,
  commentsPaginationMiddleware,
  commentsController.findAll
);
router.get(
  "/:commentId",
  authMiddleware,
  validId,
  validComment,
  commentsController.findById
);
router.patch(
  "/:commentId",
  authMiddleware,
  validId,
  validComment,
  validSameCommentUser,
  commentsController.update
);
router.delete(
  "/:commentId",
  authMiddleware,
  validId,
  validComment,
  validSameCommentUser,
  commentsController.remove
);

export default router;
