import { Router } from "express";

import {getAllUsers, getUser, updateUserRole, deleteUser, getAllFoods,deleteFood, getAllCategories, deleteCategory, getAllOrders, updateOrderStatus} from "../controller/admin.controller.js";


const adminRouter = Router();


// USERS
adminRouter.get("/users", getAllUsers);
adminRouter.get("/users/:id", getUser);
adminRouter.patch("/users/:id/role", updateUserRole);
adminRouter.delete("/users/:id", deleteUser);
adminRouter.get("/foods", getAllFoods);
adminRouter.delete("/foods/:id", deleteFood);
adminRouter.get("/categories", getAllCategories);
adminRouter.delete("/categories/:id", deleteCategory);
adminRouter.get("/orders", getAllOrders);
adminRouter.patch("/orders/:id/status", updateOrderStatus);


export default adminRouter;