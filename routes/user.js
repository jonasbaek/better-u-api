var express = require("express");
var router = express.Router();
const userController = require("../controllers/users");

router.post("/", userController.create);
router.get("/", userController.findAll);
router.get("/:id", userController.findById);

module.exports = router;
