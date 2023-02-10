import bodyParser from "body-parser";
import createError from "http-errors";
import cookieParser from "cookie-parser";
import connectDatabase from "./database/db.js";
import express from "express";
import logger from "morgan";
import path from "path";
import cors from "cors";

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
export const __dirname = dirname(__filename);

connectDatabase();

app.use(cors());

app.use((res, req, next) => {
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Methods",
    "GET,OPTIONS,PATCH,DELETE,POST,PUT"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
  );

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }
  next();
});

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

app.use("/", indexRouter);
app.use("/user", userRouter);
app.use("/auth", authRouter);
app.use("/posts", postsRouter);
app.use("/posts/:postId/comments", validId, validPost, commentsRouter);
app.use(
  "/public/uploads",
  express.static(path.join(__dirname, "/public/uploads"))
);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // return the error message
  res.status(err.status || 500);
  res.json({ error: "An error occurred" });
});
export default app;
