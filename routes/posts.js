import { Router } from "express";
import postsController from "../controllers/posts.js";

const router = Router();

router.post("/", postsController.create);
router.get("/", postsController.getAll);

export default router;
