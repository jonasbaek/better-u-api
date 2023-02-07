import postsService from "../services/posts.js";
import commentsService from "../services/comments.js";

export const postsPaginationMiddleware = async (req, res, next) => {
  let { limit } = req.query;
  limit = Number(limit);
  if (!limit) {
    limit = 5;
  }
  const total = await postsService.countPosts();
  const morePosts = limit + 5 >= total ? total : limit + 5;
  const nextUrl = morePosts <= total ? `?limit=${morePosts}` : null;
  req.pagination = { nextUrl, limit, total };
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
  const total = await commentsService.countComments(req.postId);
  const currentUrl = req.baseUrl;
  const nextPage = offset + limit;
  const nextUrl =
    nextPage < total ? `?limit=${limit}&offset=${nextPage}` : null;

  const previous = offset - limit < 0 ? null : offset - limit;
  const previousUrl =
    previous != null ? `?limit=${limit}&offset=${previous}` : null;
  req.pagination = { nextUrl, previousUrl, limit, offset, total };
  next();
};
