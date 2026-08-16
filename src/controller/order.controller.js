import Order from "../model/order.model.js";
import Food from "../model/food.model.js";


export const createOrder = async (req, res) => {
    try {
        const { customer, items, deliveryAddress } = req.body;

        if (!customer || !items || items.length === 0 || !deliveryAddress) {
            return res.status(400).json({
                error: "Customer, items and delivery address are required"
            });
        }

        let totalPrice = 0;
        const orderItems = [];

        for (const item of items) {

            const food = await Food.findById(item.food);

            if (!food) {
                return res.status(404).json({
                    error: `Food with id ${item.food} not found`
                });
            }

            if (!food.availability) {
                return res.status(400).json({
                    error: `${food.name} is currently unavailable`
                });
            }

            const quantity = item.quantity;

            if (!quantity || quantity < 1) {
                return res.status(400).json({
                    error: "Quantity must be at least 1"
                });
            }

            const itemTotal = food.price * quantity;

            totalPrice += itemTotal;

            orderItems.push({
                food: food._id,
                quantity,
                price: food.price
            });
        }

        const order = await Order.create({
            customer,
            items: orderItems,
            totalPrice,
            deliveryAddress,
            paymentStatus: "Pending",
            orderStatus: "Pending"
        });

        res.status(201).json({
            message: "Order created successfully",
            order
        });

    } catch (error) {

        console.log("ERROR:", error);

        return res.status(500).json({
            error: error.message
        });
    }
};


export const getOrder = async (req, res) => {
    try {

        const { id } = req.params;

        const order = await Order.findById(id)
            .populate("customer", "name lastname email phone")
            .populate("items.food", "name price image");

        if (!order) {
            return res.status(404).json({
                message: "Order not found"
            });
        }

        res.status(200).json({
            message: "Order found",
            order
        });

    } catch (error) {

        console.log("ERROR:", error);

        return res.status(500).json({
            error: error.message
        });
    }
};


export const cancelOrder = async (req, res) => {
    try {

        const { id } = req.params;

        const order = await Order.findById(id);

        if (!order) {
            return res.status(404).json({
                message: "Order not found"
            });
        }

        if (
            order.orderStatus === "Delivered" ||
            order.orderStatus === "Cancelled"
        ) {
            return res.status(400).json({
                message: "This order cannot be cancelled"
            });
        }

        order.orderStatus = "Cancelled";

        await order.save();

        res.status(200).json({
            message: "Order cancelled successfully",
            order
        });

    } catch (error) {

        console.log("ERROR:", error);

        return res.status(500).json({
            error: error.message
        });
    }
};


export const getOrderHistory = async (req, res) => {
    try {

        const { customer } = req.params;

        const orders = await Order.find({
            customer
        })
        .populate("items.food", "name price image")
        .sort({ createdAt: -1 });

        res.status(200).json({
            message: "Order history retrieved successfully",
            orders
        });

    } catch (error) {

        console.log("ERROR:", error);

        return res.status(500).json({
            error: error.message
        });
    }
};


export const updateOrderStatus = async (req, res) => {
    try {

        const { id } = req.params;
        const { orderStatus } = req.body;

        const allowedStatuses = [
            "Pending",
            "Confirmed",
            "Preparing",
            "Ready",
            "Out for Delivery",
            "Delivered",
            "Cancelled"
        ];

        if (!allowedStatuses.includes(orderStatus)) {
            return res.status(400).json({
                error: "Invalid order status"
            });
        }

        const order = await Order.findById(id);

        if (!order) {
            return res.status(404).json({
                message: "Order not found"
            });
        }

        order.orderStatus = orderStatus;

        await order.save();

        res.status(200).json({
            message: "Order status updated successfully",
            order
        });

    } catch (error) {

        console.log("ERROR:", error);

        return res.status(500).json({
            error: error.message
        });
    }
};


export const getAllOrders = async (req, res) => {
    try {

        const orders = await Order.find()
            .populate("customer", "name lastname email phone")
            .populate("items.food", "name price image")
            .sort({ createdAt: -1 });

        if (!orders) {
            return res.status(404).json({
                message: "No orders found"
            });
        }

        res.status(200).json({
            message: "All orders retrieved successfully",
            orders
        });

    } catch (error) {

        console.log("ERROR:", error);

        return res.status(500).json({
            error: error.message
        });
    }
};