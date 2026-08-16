import { Router } from "express";

import {getRestaurant,updateRestaurant} from "../controller/restaurant.controller.js";


const restaurantRouter = Router();

restaurantRouter.get("/", getRestaurant);
restaurantRouter.patch("/", updateRestaurant);


export default restaurantRouter;