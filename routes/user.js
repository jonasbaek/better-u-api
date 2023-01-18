import { Router } from "express";
import userController from "../controllers/user.js";
import {
  validId,
  validUser,
  validUserCreation,
} from "../middlewares/global.js";

const router = Router();

router.post("/", validUserCreation, userController.create);
router.get("/", userController.findAll);
router.get("/:userId", validId, validUser, userController.findById);
router.patch("/:userId", validId, validUser, userController.update);
//é uma sequência, os middlewares iniciam antes e após sucesso o next() prossegue até a próxima etapa

export default router;
