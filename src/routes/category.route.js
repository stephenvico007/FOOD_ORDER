import { Router } from "express";

import {createCategory, getCategories, getCategory, updateCategory, deleteCategory} from "../controller/category.controller.js";

const categoryRouter = Router();

categoryRouter.post("/create", createCategory);
categoryRouter.get("/", getCategories);
categoryRouter.get("/:id", getCategory);
categoryRouter.patch("/:id", updateCategory);
categoryRouter.delete("/:id", deleteCategory);

export default categoryRouter;