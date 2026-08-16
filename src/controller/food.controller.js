import Food from "../model/food.model.js";
import Category from "../model/category.model.js";


export const createFood = async (req, res) => {
  try {
    const {name, description, price, category, availability} = req.body;

    if (!name || !description || price === undefined || !category) {
      return res.status(400).json({
        message: "Name, description, price and category are required",
      });
    }
    const existingCategory = await Category.findById(category);

    if (!existingCategory) {
      return res.status(404).json({
        message: "Category not found",
      });
    }

    const existingFood = await Food.findOne({
      name,
      deletedAt: null,
    });

    if (existingFood) {
      return res.status(409).json({
        message: "Food already exists",
      });
    }

    const food = await Food.create({
      name,
      description,
      price,
      category,
      availability: availability ?? true,

      createdBy: req.body.createdBy,
    });

    res.status(201).json({
      message: "Food created successfully",
      food,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to create food",
      error: error.message,
    });
  }
};


export const getFoods = async (req, res) => {
  try {
    const foods = await Food.find({
      deletedAt: null,
    })
      .populate("category", "name description")
      .populate("createdBy", "name email");

    res.status(200).json({
      message: "Foods retrieved successfully",
      foods,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to retrieve foods",
      error: error.message,
    });
  }
};


export const getFood = async (req, res) => {
  try {
    const { id } = req.params;

    const food = await Food.findOne({
      _id: id,
      deletedAt: null,
    })
      .populate("category", "name description")
      .populate("createdBy", "name email");

    if (!food) {
      return res.status(404).json({
        message: "Food not found",
      });
    }

    res.status(200).json({
      message: "Food retrieved successfully",
      food,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to retrieve food",
      error: error.message,
    });
  }
};


export const updateFood = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      name,
      description,
      price,
      category,
      availability,
    } = req.body;

    const food = await Food.findOne({
      _id: id,
      deletedAt: null,
    });

    if (!food) {
      return res.status(404).json({
        message: "Food not found",
      });
    }

    if (category) {
      const existingCategory = await Category.findById(category);

      if (!existingCategory) {
        return res.status(404).json({
          message: "Category not found",
        });
      }

      food.category = category;
    }

    if (name !== undefined) food.name = name;
    if (description !== undefined) food.description = description;
    if (price !== undefined) food.price = price;
    if (availability !== undefined) food.availability = availability;

    await food.save();

    res.status(200).json({
      message: "Food updated successfully",
      food,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update food",
      error: error.message,
    });
  }
};


export const deleteFood = async (req, res) => {
  try {
    const { id } = req.params;

    const food = await Food.findOne({
      _id: id,
      deletedAt: null,
    });

    if (!food) {
      return res.status(404).json({
        message: "Food not found",
      });
    }

    food.deletedAt = new Date();

    await food.save();

    res.status(200).json({
      message: "Food deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete food",
      error: error.message,
    });
  }
};


export const restoreFood = async (req, res) => {
  try {
    const { id } = req.params;

    const food = await Food.findOne({
      _id: id,
      deletedAt: { $ne: null },
    });

    if (!food) {
      return res.status(404).json({
        message: "Deleted food not found",
      });
    }

    food.deletedAt = null;

    await food.save();

    res.status(200).json({
      message: "Food restored successfully",
      food,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to restore food",
      error: error.message,
    });
  }
};


export const updateAvailability = async (req, res) => {
  try {
    const { id } = req.params;
    const { availability } = req.body;

    if (typeof availability !== "boolean") {
      return res.status(400).json({
        message: "Availability must be true or false",
      });
    }

    const food = await Food.findOne({
      _id: id,
      deletedAt: null,
    });

    if (!food) {
      return res.status(404).json({
        message: "Food not found",
      });
    }

    food.availability = availability;

    await food.save();

    res.status(200).json({
      message: availability
        ? "Food is now available"
        : "Food is now unavailable",
      food,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update food availability",
      error: error.message,
    });
  }
};