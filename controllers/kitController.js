import kitModel from "../model/kitModel.js";

export const getAllkitsController = (req, res) => {
    kitModel.find({})
        .then(products => res.json(products))
        .catch(err => res.json(err));
}

export const getSinglekitController = (req, res) => {
    const kitId = req.params.id; 
    kitModel.findById(kitId)
        .then(kit => {
            if (kit) {
                res.json(kit); 
            } else {
                res.status(404).json({ message: "kit not found" }); 
            }
        })
        .catch(err => res.status(500).json({ error: "Error retrieving kit", details: err }));
}

