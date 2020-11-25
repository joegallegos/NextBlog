require('dotenv').config();

module.exports = {
  env: {
    GHOST_CONTENT_API_KEY: process.env.GHOST_CONTENT_API_KEY,
    BLOG_URL: process.env.BLOG_URL,
  },
};
