import { Router } from "express";
import { Register } from "../controller/auth.controller.js";

const authRouter = Router();

authRouter.post("/register", Register);

export default authRouter;