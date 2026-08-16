import mongoose from "mongoose"

const categorySchema =  new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50,
        trim: true
    },
    description: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50,
        trim: true
    },
},
{
    Timestamp:true
}
);


const Category = mongoose.model('Category', categorySchema)
export default Category