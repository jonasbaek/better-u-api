import postsService from "../services/posts.js";
import commentsService from "../services/comments.js";

export const postsPaginationMiddleware = async (req, res, next) => {
  let { limit, offset } = req.query;
  limit = Number(limit);
  offset = Number(offset);
  if (!limit) {
    limit = 5;
  }
  if (!offset) {
    offset = 0;
  }
  const total = await postsService.countPosts();
  const currentUrl = req.baseUrl;
  const nextPage = offset + limit;
  const nextUrl =
    nextPage < total ? `${currentUrl}?limit=${limit}&offset=${nextPage}` : null;

  const previous = offset - limit < 0 ? null : offset - limit;
  const previousUrl =
    previous != null ? `${currentUrl}?limit=${limit}&offset=${previous}` : null;
  req.pagination = { nextUrl, previousUrl, limit, offset, total };
  next();
};

export const commentsPaginationMiddleware = async (req, res, next) => {
  let { limit, offset } = req.query;
  limit = Number(limit);
  offset = Number(offset);
  if (!limit) {
    limit = 5;
  }
  if (!offset) {
    offset = 0;
  }
  const total = await commentsService.countComments();
  const currentUrl = req.baseUrl;
  const nextPage = offset + limit;
  const nextUrl =
    nextPage < total ? `${currentUrl}?limit=${limit}&offset=${nextPage}` : null;

  const previous = offset - limit < 0 ? null : offset - limit;
  const previousUrl =
    previous != null ? `${currentUrl}?limit=${limit}&offset=${previous}` : null;
  req.pagination = { nextUrl, previousUrl, limit, offset, total };
  next();
};
