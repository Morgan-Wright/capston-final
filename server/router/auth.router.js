const express = require("express");
const {
  handleSignUp,
  handleLogin,
  handleLogout,
} = require("../controller/auth.controller");

const authRouter = express.router();

authRouter.post("/sign-up", handleSignUp);
authRouter.post("/login", handleLogin);
authRouter.delete("/logout", handleLogout);

module.exports = {
  authRouter,
};
