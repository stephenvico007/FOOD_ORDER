import express from "express";


import swaggerUi from "swagger-ui-express"
import authRouter from "./routes/auth.route.js";
import categoryRouter from "./routes/category.route.js";
import foodRouter from "./routes/food.route.js";
import orderRouter from "./routes/order.route.js";
import restaurantRouter from "./routes/restaurant.route.js";
import swaggerDocument from "./swagger.js"


const app = express();


app.use(express.json());


app.use("/auth", authRouter);
app.use("/api/category", categoryRouter);
app.use("api/food", foodRouter);
app.use("/api/order", orderRouter);
app.use("/api/restaurant", restaurantRouter);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument))


export default app;

