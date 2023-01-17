import express from "express";
import userController from "../controllers/user.js";
import {
  validId,
  validUser,
  validUserCreation,
} from "../middlewares/global.js";

const router = express.Router();

router.post("/", validUserCreation, userController.create);
router.get("/", userController.findAll);
router.get("/:id", validId, validUser, userController.findById);
router.patch("/:id", validId, validUser, userController.update);
//é uma sequência, os middlewares iniciam antes e após sucesso o next() prossegue até a próxima etapa

export default router;
