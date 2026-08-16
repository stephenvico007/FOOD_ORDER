import mongoose from "mongoose";

const restaurantSchema = new mongoose.Schema(
    {
      name: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 50,
      trim: true,
    },

        description: {
            type: String,
            default: "",
            trim: true
        },

       phone: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

        email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    
        address: {
            type: String,
            required: true,
            trim: true
        },

        logo: {
            type: String,
            default: ""
        },

        openingHours: {
            type: String,
            default: ""
        }
    },
    {
        timestamps: true
    }
);

const Restaurant = mongoose.model("Restaurant", restaurantSchema);

export default Restaurant;