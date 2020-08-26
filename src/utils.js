const jwt = require("jsonwebtoken");
require("dotenv").config();

const APP_SECRET = process.env.APP_SECRET;

function getUserId(context) {
  const auth = context.request.get("Authorization");
  if (auth) {
    const token = auth.replace("Bearer ", "");
    const { userId } = jwt.verify(token, APP_SECRET);
    return userId;
  }

  throw new Error("Not Authenticated");
}

module.exports = {
  APP_SECRET,
  getUserId,
};
