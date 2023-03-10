import { Router } from "express";
import userController from "../controllers/user.js";
import {
  validId,
  validUser,
  validUserCreation,
  validUserRemoveAccount,
} from "../middlewares/global.js";
import { authMiddleware } from "../middlewares/auth.js";
import { upload } from "../middlewares/uploadAvatarsImage.js";

const router = Router();

router.post("/", validUserCreation, userController.create);
router.get("/", authMiddleware, userController.findAll);
router.get("/me", authMiddleware, (req, res) => {
  return res.json(req.currentUser);
});
router.get("/search/:name", authMiddleware, userController.findByName);
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
  upload.single("image"),
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
