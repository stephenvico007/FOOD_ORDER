import { Router } from "express";

import {createOrder, getOrder, cancelOrder, getOrderHistory, updateOrderStatus, getAllOrders} from "../controller/order.controller.js";


const orderRouter = Router();


orderRouter.post("/create", createOrder);
orderRouter.get("/history/:customer", getOrderHistory);
orderRouter.get("/", getAllOrders);
orderRouter.get("/:id", getOrder);
orderRouter.patch("/:id/cancel", cancelOrder);
orderRouter.patch("/:id/status", updateOrderStatus);


export default orderRouter;