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
router.get("/", userController.findAll);
router.get("/me", authMiddleware, (req, res) => {
  return res.json(req.currentUser);
});
router.get("/:userId", validId, validUser, userController.findById);
router.patch("/:userId", validId, validUser, userController.update);
router.delete(
  "/:userId",
  authMiddleware,
  validId,
  validUser,
  validUserRemoveAccount,
  userController.remove
);

export default router;
