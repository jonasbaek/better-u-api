import createError from "http-errors";
import cookieParser from "cookie-parser";
import connectDatabase from "./database/db.js";
import express from "express";
import logger from "morgan";
import path from "path";

import indexRouter from "./routes/index.js";
import userRouter from "./routes/user.js";
import authRouter from "./routes/auth.js";
import postsRouter from "./routes/posts.js";
import commentsRouter from "./routes/comments.js";

import { validId, validPost } from "./middlewares/global.js";

import { fileURLToPath } from "url";
import { dirname } from "path";
import "dotenv/config";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

connectDatabase();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/user", userRouter);
app.use("/auth", authRouter);
app.use("/posts", postsRouter);
app.use("/posts/:postId/comments", validId, validPost, commentsRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

export default app;
