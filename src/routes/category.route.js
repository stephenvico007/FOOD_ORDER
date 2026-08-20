import { Router } from "express";

import {createCategory, getCategories, getCategory, updateCategory, deleteCategory} from "../controller/category.controller.js";
import { protect } from "../middleware/protect.middleware.js";

const categoryRouter = Router();

categoryRouter.post("/create", protect, createCategory);
categoryRouter.get("/",protect, getCategories);
categoryRouter.get("/:id",protect, getCategory);
categoryRouter.patch("/:id",protect, updateCategory);
categoryRouter.delete("/:id",protect, deleteCategory);

export default categoryRouter;