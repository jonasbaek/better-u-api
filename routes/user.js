import { Router } from "express";
import userController from "../controllers/user.js";
import {
  validId,
  validUser,
  validUserCreation,
  validUserRemoveAccount,
} from "../middlewares/global.js";
import { authMiddleware } from "../middlewares/auth.js";

const router = Router();

router.post("/", validUserCreation, userController.create);
router.get("/", authMiddleware, userController.findAll);
router.get("/me", authMiddleware, (req, res) => {
  return res.json(req.currentUser);
});
router.get(
  "/:userId",
  authMiddleware,
  validId,
  validUser,
  userController.findById
);
router.patch(
  "/:userId",
  authMiddleware,
  validId,
  validUser,
  userController.update
);
router.patch(
  "/add/:userId",
  authMiddleware,
  validId,
  validUser,
  userController.addFriend
);
router.delete(
  "/:userId",
  authMiddleware,
  validId,
  validUser,
  validUserRemoveAccount,
  userController.remove
);

export default router;
