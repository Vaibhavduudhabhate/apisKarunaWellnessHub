import productModel from "../model/productModel.js";

export const getAllProductsController = (req, res) => {
    productModel.find({})
        .then(products => res.json(products))
        .catch(err => res.json(err));
}

export const getSingleProductController = (req, res) => {
    const productId = req.params.id; 
    productModel.findById(productId)
        .then(product => {
            if (product) {
                res.json(product); 
            } else {
                res.status(404).json({ message: "Product not found" }); 
            }
        })
        .catch(err => res.status(500).json({ error: "Error retrieving product", details: err }));
}

