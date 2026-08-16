import Restaurant from "../model/restaurant.model.js";


export const getRestaurant = async (req, res) => {
    try {

        const restaurant = await Restaurant.findOne();

        if (!restaurant) {
            return res.status(404).json({
                message: "Restaurant information not found"
            });
        }

        res.status(200).json({
            message: "Restaurant information retrieved successfully",
            restaurant
        });

    } catch (error) {

        console.log("ERROR:", error);

        return res.status(500).json({
            error: error.message
        });
    }
};


export const updateRestaurant = async (req, res) => {
    try {

        const {
            name,
            description,
            phone,
            email,
            address,
            logo,
            openingHours
        } = req.body;

        let restaurant = await Restaurant.findOne();

        if (!restaurant) {
            restaurant = await Restaurant.create({
                name,
                description,
                phone,
                email,
                address,
                logo,
                openingHours
            });
        } else {

            restaurant.name = name ?? restaurant.name;
            restaurant.description = description ?? restaurant.description;
            restaurant.phone = phone ?? restaurant.phone;
            restaurant.email = email ?? restaurant.email;
            restaurant.address = address ?? restaurant.address;
            restaurant.logo = logo ?? restaurant.logo;
            restaurant.openingHours = openingHours ?? restaurant.openingHours;

            await restaurant.save();
        }

        res.status(200).json({
            message: "Restaurant information updated successfully",
            restaurant
        });

    } catch (error) {

        console.log("ERROR:", error);

        return res.status(500).json({
            error: error.message
        });
    }
};