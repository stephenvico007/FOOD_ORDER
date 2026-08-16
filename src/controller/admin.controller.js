import User from "../model/user.model.js";
import Food from "../model/food.model.js";
import Category from "../model/category.model.js";
import Order from "../model/order.model.js";


export const getAllUsers = async (req, res) => {
    try {

        const users = await User.find().select("-password");

        if (!users) {
            return res.status(404).json({
                message: "No users found"
            });
        }

        res.status(200).json({
            message: "All users retrieved successfully",
            users
        });

    } catch (error) {

        console.log("ERROR:", error);

        return res.status(500).json({
            error: error.message
        });
    }
};



export const getUser = async (req, res) => {
    try {

        const { id } = req.params;

        const user = await User.findById(id).select("-password");

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        res.status(200).json({
            message: "User found",
            user
        });

    } catch (error) {

        console.log("ERROR:", error);

        return res.status(500).json({
            error: error.message
        });
    }
};


export const updateUserRole = async (req, res) => {
    try {

        const { id } = req.params;
        const { role } = req.body;

        if (!role) {
            return res.status(400).json({
                message: "Please provide a role"
            });
        }

        if (!["customer", "staff", "admin"].includes(role)) {
            return res.status(400).json({
                message: "Invalid role"
            });
        }

        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        user.role = role;

        await user.save();

        res.status(200).json({
            message: "User role updated successfully",
            user
        });

    } catch (error) {

        console.log("ERROR:", error);

        return res.status(500).json({
            error: error.message
        });
    }
};


export const deleteUser = async (req, res) => {
    try {

        const { id } = req.params;

        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        await User.findByIdAndDelete(id);

        res.status(200).json({
            message: "User deleted successfully"
        });

    } catch (error) {

        console.log("ERROR:", error);

        return res.status(500).json({
            error: error.message
        });
    }
};


export const getAllFoods = async (req, res) => {
    try {

        const foods = await Food.find()
            .populate("category", "name")
            .populate("createdBy", "name email");

        if (!foods) {
            return res.status(404).json({
                message: "No food items found"
            });
        }

        res.status(200).json({
            message: "All food items retrieved successfully",
            foods
        });

    } catch (error) {

        console.log("ERROR:", error);

        return res.status(500).json({
            error: error.message
        });
    }
}

export const deleteFood = async (req, res) => {
    try {

        const { id } = req.params;

        const food = await Food.findById(id);

        if (!food) {
            return res.status(404).json({
                message: "Food not found"
            });
        }

        await Food.findByIdAndDelete(id);

        res.status(200).json({
            message: "Food deleted successfully"
        });

    } catch (error) {

        console.log("ERROR:", error);

        return res.status(500).json({
            error: error.message
        });
    }
};


export const getAllCategories = async (req, res) => {
    try {

        const categories = await Category.find();

        if (!categories) {
            return res.status(404).json({
                message: "No categories found"
            });
        }

        res.status(200).json({
            message: "All categories retrieved successfully",
            categories
        });

    } catch (error) {

        console.log("ERROR:", error);

        return res.status(500).json({
            error: error.message
        });
    }
};


export const deleteCategory = async (req, res) => {
    try {

        const { id } = req.params;

        const category = await Category.findById(id);

        if (!category) {
            return res.status(404).json({
                message: "Category not found"
            });
        }

        await Category.findByIdAndDelete(id);

        res.status(200).json({
            message: "Category deleted successfully"
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
                message: "Invalid order status"
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