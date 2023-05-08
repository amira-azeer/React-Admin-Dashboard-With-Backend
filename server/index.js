import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotEnv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";

import clientRoutes from "./routes/client.js";
import generalRoutes from "./routes/general.js";
import managementRoutes from "./routes/management.js";
import salesRoutes from "./routes/sales.js";


// CONFIGURATIONS
dotEnv.config();
const app = express();
app.use(express.json()); // Enable express for routing 
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin"})); // Make API calls from another server
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());


// Data Imports
// import User from "./models/User.js"; // Importing the model for data injection
// import Product from "./models/Product.js";
// import ProductStat from "./models/ProductStat.js";

import { dataUser, dataProduct, dataProductStat } from "./data/index.js"; // Mock data for injection
 

// Routes 
app.use("/client", clientRoutes);
app.use("/general", generalRoutes);
app.use("/management", managementRoutes);
app.use("/sales", salesRoutes);


// Mongoose Set Up
const PORT = process.env.PORT || 9000; // Backup Port

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    app.listen(PORT, () => {
        console.log(`Server Port : ${PORT}`);
    })

    // Only add data once to prevent duplications 
    // User.insertMany(dataUser)
    // Product.insertMany(dataProduct)
    // ProductStat.insertMany(dataProductStat)
    

}).catch((error) => {
    console.log(`${error} did not connect`)
})



