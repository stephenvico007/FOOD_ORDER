import { Router } from "express";
import { Register, Login } from "../controller/auth.controller.js";

const authRouter = Router();

authRouter.post("/register", Register);
authRouter.post("/login", Login);

export default authRouter;