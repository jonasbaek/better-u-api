const express = require("express");
const router = express.Router();
const userController = require("../controllers/user");
const { validId, validUser } = require("../middlewares/global");

router.post("/", userController.create);
router.get("/", userController.findAll);
router.get("/:id", validId, validUser, userController.findById);
router.patch("/:id", validId, validUser, userController.update);
//é uma sequência, os middlewares iniciam antes e após sucesso o next() prossegue até a próxima etapa

module.exports = router;
