import { Router } from "express";

import {
    createFood,
    getFoods,
    getFood,
    updateFood,
    deleteFood,
    restoreFood,
    uploadFoodImage,
    toggleAvailability
} from "../controller/food.controller.js";

import { protect, isRole } from "../middleware/protect.js";
import { uploadCloudinary } from "../middleware/upload.middleware.js";

const foodRouter = Router();


// View all foods
foodRouter.get(
    "/",
    protect,
    getFoods
);


// View one food
foodRouter.get(
    "/:id",
    protect,
    getFood
);


// Create food
foodRouter.post(
    "/create",
    protect,
    isRole(["staff", "admin"]),
    createFood
);


// Update food
foodRouter.patch(
    "/:id",
    protect,
    isRole(["staff", "admin"]),
    updateFood
);


// Delete food
foodRouter.delete(
    "/:id",
    protect,
    isRole(["admin"]),
    deleteFood
);


// Restore food
foodRouter.patch(
    "/:id/restore",
    protect,
    isRole(["admin"]),
    restoreFood
);


// Upload food image
foodRouter.patch(
    "/:id/image",
    protect,
    isRole(["staff", "admin"]),
    uploadCloudinary.single("image"),
    uploadFoodImage
);


// Availability
foodRouter.patch(
    "/:id/availability",
    protect,
    isRole(["staff", "admin"]),
    toggleAvailability
);


export default foodRouter;