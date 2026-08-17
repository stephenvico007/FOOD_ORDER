import { Router } from "express";
import {createFood, getFoods, getFood, deleteFood, restoreFood,  updateFood, updateAvailability} from "../controller/food.controller.js";
import { protect, isRole } from "../middleware/protect.middleware.js";
import { uploadCloudinary } from "../middleware/upload.middleware.js";

const foodRouter = Router();



foodRouter.get("/", protect, getFoods);
foodRouter.get("/:id", protect, getFood);
foodRouter.post("/create", protect, isRole(["staff", "admin"]), createFood);
foodRouter.patch("/:id", protect, isRole(["staff", "admin"]), updateFood);
foodRouter.delete("/:id",protect, isRole(["admin"]), deleteFood);
foodRouter.patch("/:id/restore", protect, isRole(["admin"]), restoreFood);





export default foodRouter;