import express from "express";

import { signin, signup } from "../controllers/authControllers.js";

const authRoute = express.Router();

// Signup
authRoute.post("/signup", signup);

// Signin
authRoute.post("/signin", signin);

export default authRoute;
