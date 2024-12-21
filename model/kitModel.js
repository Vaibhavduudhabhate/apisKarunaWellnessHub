
import mongoose from "mongoose";

const kitSchema = new mongoose.Schema({
    Kit_name: {
        type: String,
        required: [true, 'Please enter a product name']
    },
    Kit_image: {
        type: String,
        required: [true, 'Please provide an image URL']
    },
    Kit_tagline:{
        type: String,
    },
    Kit_varient:{
        type: String,
    },
    Kit_price:{
        type: String,
        required: [true, 'Please provide an image URL']
    },
    Kit_description:{
        type: String,
        // required: [true, 'Please provide an image URL']
    }

}, { timestamps: true });

const kitModel = mongoose.model('karunaKits', kitSchema);

export default kitModel;