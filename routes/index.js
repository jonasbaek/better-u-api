import express from "express";
const router = express.Router();

/* GET home page. */
router.get("/", (req, res) => {
  return res.json({
    success: true,
    message: "Better-u api is working!",
  });
});

export default router;
