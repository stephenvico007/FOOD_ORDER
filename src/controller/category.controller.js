import Category from "../model/category.model.js";
import slugify from "slugify";


export const createCategory = async (req, res) => {
    try {
        const { name, description } = req.body;

        if (!name || !description) {
            return res.status(400).json({
                error: "Please provide all required fields"
            });
        }

        const category = await Category.create({
            name,
            description
        });

        res.status(201).json({
            message: "Category created successfully",
            category
        });

    } catch (error) {
        console.log("ERROR:", error);

        return res.status(500).json({
            error: error.message
        });
    }
};


const getAllcategories = async (req, res) => {

    const categories = await Category.find();

    if (!categories) {
        return res.status(404).json({
            message: "No categories found"
        });
    }

    res.status(200).json({
        message: "These are all the categories",
        categories
    });
};


export const getCategories = async (req, res) => {
    try {
        const categories = await Category.find();

        if (!categories) {
            return res.status(404).json({
                message: "No categories found"
            });
        }

        res.status(200).json({
            message: "These are all the categories",
            categories
        });

    } catch (error) {
        console.log("ERROR:", error);

        return res.status(500).json({
            error: error.message
        });
    }
};


export const getCategory = async (req, res) => {
    try {
        const { id } = req.params;

        const category = await Category.findById(id);

        if (!category) {
            return res.status(404).json({
                message: "Category not found"
            });
        }

        res.status(200).json({
            message: "Category found",
            category
        });

    } catch (error) {
        console.log("ERROR:", error);

        return res.status(500).json({
            error: error.message
        });
    }
};


export const updateCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description } = req.body;

        let category = await Category.findById(id);

        if (!category) {
            return res.status(404).json({
                message: "Category not found"
            });
        }

        let update = { name, description };

        category = await Category.findByIdAndUpdate(
            id,
            update,
            { new: true }
        );

        res.status(200).json({
            message: "Category updated successfully",
            category
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