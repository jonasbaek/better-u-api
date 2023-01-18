import rateLimit from "express-rate-limit";

export const createRateLimiter = (windowMs, max, message) => {
  return rateLimit({
    windowMs: windowMs,
    max: max,
    message: message,
  });
};
