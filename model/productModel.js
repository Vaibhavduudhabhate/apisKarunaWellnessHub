
import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    Product_name: {
        type: String,
        required: [true, 'Please enter a product name']
    },
    Product_image: {
        type: String,
        required: [true, 'Please provide an image URL']
    },
    Product_tagline:{
        type: String,
    },
    Product_varient:{
        type: String,
    },
    Product_price:{
        type: String,
        required: [true, 'Please provide an image URL']
    },
    Product_description_english:{
        type: String,
        // required: [true, 'Please provide an image URL']
    },
    Product_description_hindi:{
        type: String,
        // required: [true, 'Please provide an image URL']
    }

}, { timestamps: true });

const productModel = mongoose.model('karunaProduct', productSchema);

export default productModel;