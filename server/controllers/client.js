import Product from "../models/Product.js";
import ProductStat from "../models/ProductStat.js";

export const getProducts = async ( req, res ) => {
    try {
       const products = await Product.find() // Give us all the products exisiting in the database

       const productWithStats = await Promise.all(
        products.map(async (product) => { // Extracting the stat for each product  
            const stat = await ProductStat.find({
                productId: Product._id
            })
            return { // Returning an array of objects 
                ...product._doc, // Product information
                stat, // Combined with the stats per product
            };
        })
       );
       res.status(200).json(productWithStats);
      } catch (error) {
        res.status(404).json({ message: error.message }); // Very generic error
      }
}