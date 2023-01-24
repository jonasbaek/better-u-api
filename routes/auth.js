import { Router } from "express";
import { login, validate } from "../controllers/auth.js";
import { authMiddleware } from "../middlewares/auth.js";

const router = Router();
router.post("/", login);
router.get("/validate", authMiddleware, validate);

export default router;
