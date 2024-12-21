import mongoose from "mongoose";
import productModel from "./model/productModel.js";
import fs from "fs";
import path from "path";
import kitModel from "./model/kitModel.js";
// path

async function connectMongoDb(url) {
    return mongoose.connect(url);
}

async function addProductKits() {
    await connectMongoDb('mongodb+srv://admin:admin1234@cluster0.w3huoar.mongodb.net/practiceDatabase');
    // const assetsPath = \.resolve("assets");
    const assetsPath = path.resolve("assets");

    const ProductsKits = [
        {
            Kit_name: "WEIGHT GAIN KIT",
            Kit_tagline:"",
            Kit_varient: "",
            Kit_image: `data:image/jpeg;base64,${fs.readFileSync(path.join(assetsPath, "productkits1.png")).toString("base64")}`,
            Kit_price: "3150 ₹",
            Kit_description: `1 Berry Plus Capsules +/1 All In One Capsules +/1 Health Force Capsules`
        },
        {
            Kit_name: "FEMALE HYGINE KIT",
            Kit_tagline:"",
            Kit_varient: "",
            Kit_image: `data:image/jpeg;base64,${fs.readFileSync(path.join(assetsPath, "productkits1.png")).toString("base64")}`,
            Kit_price: "3150 ₹",
            Kit_description: `2 Pro Care +/4 Pro Wings +/4 Pro Liner`
        },
        {
            Kit_name: "FEMALE PCOD KIT",
            Kit_tagline:"",
            Kit_varient: "",
            Kit_image: `data:image/jpeg;base64,${fs.readFileSync(path.join(assetsPath, "productkits1.png")).toString("base64")}`,
            Kit_price: "3150 ₹",
            Kit_description: `2 Female Choice +/2 Pro Wings +/3 Pro Liner`
        },
        {
            Kit_name: "WEIGHT LOSS KIT",
            Kit_tagline:"",
            Kit_varient: "",
            Kit_image: `data:image/jpeg;base64,${fs.readFileSync(path.join(assetsPath, "productkits1.png")).toString("base64")}`,
            Kit_price: "3150 ₹",
            Kit_description: `1 All In One Capsules +/3 Nano Cellulite Gel +/1 Xerofit Capsules`
        },
        {
            Kit_name: "PILES CARE KIT",
            Kit_tagline:"",
            Kit_varient: "",
            Kit_image: `data:image/jpeg;base64,${fs.readFileSync(path.join(assetsPath, "productkits1.png")).toString("base64")}`,
            Kit_price: "3150 ₹",
            Kit_description: `1 All In One Capsules +/2 Pilo Heal Capsules`
        },
        {
            Kit_name: "BODY PAIN RELIFE",
            Kit_tagline:"",
            Kit_varient: "",
            Kit_image: `data:image/jpeg;base64,${fs.readFileSync(path.join(assetsPath, "productkits1.png")).toString("base64")}`,
            Kit_price: "3150 ₹",
            Kit_description: `1 All In One Capsules +/1 All Total Oil +/1 All Total Capsules`
        },
        {
            Kit_name: "HEART CARE KIT",
            Kit_tagline:"",
            Kit_varient: "",
            Kit_image: `data:image/jpeg;base64,${fs.readFileSync(path.join(assetsPath, "productkits1.png")).toString("base64")}`,
            Kit_price: "3150 ₹",
            Kit_description: `1 All In One Capsules +/2 Cardiocare Capsules`
        },
        {
            Kit_name: "GOOD NEWS KIT",
            Kit_tagline:"",
            Kit_varient: "",
            Kit_image: `data:image/jpeg;base64,${fs.readFileSync(path.join(assetsPath, "productkits1.png")).toString("base64")}`,
            Kit_price: "3150 ₹",
            Kit_description: `1 Female Choice Capsules +/1 Men's Solution Capsules +/2 Pro Wings + 3 Pro Liner`
        },
        {
            Kit_name: "FAMILY HAPPINESS KIT",
            Kit_tagline:"",
            Kit_varient: "",
            Kit_image: `data:image/jpeg;base64,${fs.readFileSync(path.join(assetsPath, "productkits1.png")).toString("base64")}`,
            Kit_price: "3150 ₹",
            Kit_description: "1 Female Choice Capsules +/1 Men's Solution Capsules +/1 All In One Capsules"
        },
        {
            Kit_name: "KIDENY STONE CARE KIT",
            Kit_tagline:"",
            Kit_varient: "",
            Kit_image: `data:image/jpeg;base64,${fs.readFileSync(path.join(assetsPath, "productkits1.png")).toString("base64")}`,
            Kit_price: "3150 ₹",
            Kit_description: "2 Calycure Capsules +/1 All In One Capsules"
        },
        {
            Kit_name: "BEAUTY & SKIN KIT",
            Kit_tagline:"",
            Kit_varient: "",
            Kit_image: `data:image/jpeg;base64,${fs.readFileSync(path.join(assetsPath, "productkits1.png")).toString("base64")}`,
            Kit_price: "3150 ₹",
            Kit_description: "7 Alovera Gel +/1 Berry Plus Capsules + 1 All In One Capsules"
        },
        {
            Kit_name: "LIVER CARE KIT",
            Kit_tagline:"",
            Kit_varient: "",
            Kit_image: `data:image/jpeg;base64,${fs.readFileSync(path.join(assetsPath, "productkits1.png")).toString("base64")}`,
            Kit_price: "3150 ₹",
            Kit_description: "2 Livercare Capsules +/1 All In One Capsules"
        }
    ];

    try {
        await kitModel.insertMany(ProductsKits);
        console.log("Dummy products added successfully!");
    } catch (error) {
        console.error("Error adding dummy products:", error);
    } finally {
        mongoose.disconnect();
    }
}

addProductKits();