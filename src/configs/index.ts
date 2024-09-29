import "dotenv/config";

export default {
  BOT_TOKEN: process.env.BOT_TOKEN,
  BOT_USERNAME: process.env.BOT_USERNAME,
  X_RAPIDAPI_KEY: process.env.X_RAPIDAPI_KEY,
  X_RAPIDAPI_HOST: process.env.X_RAPIDAPI_HOST,
  X_RAPIDAPI_URL: process.env.X_RAPIDAPI_URL,
  GROUP_ID: process.env.GROUP_ID,
  GROUP_USERNAME: process.env.GROUP_USERNAME,
  ADMIN_CHANNEL_ID: process.env.ADMIN_CHANNEL_ID,
  MONGODB_URI: process.env.MONGODB_URI,
  PORT: process.env.PORT || 5400,
};
