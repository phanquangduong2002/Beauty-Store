import express from "express";

import {
  signin,
  signinByAdmin,
  signup,
} from "../controllers/auth.controller.js";

const authRoute = express.Router();

// Signup
authRoute.post("/signup", signup);

// Signin
authRoute.post("/signin", signin);

// Signin by admin

authRoute.post("/signin/admin", signinByAdmin);

export default authRoute;
