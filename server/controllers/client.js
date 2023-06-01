import Product from "../models/Product.js";
import ProductStat from "../models/ProductStat.js";
import User from "../models/User.js";
import Transaction from "../models/Transaction.js";
import getCountryIso3 from 'country-iso-2-to-3';

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find(); // Give us all the products exisiting in the database

    const productWithStats = await Promise.all(
      products.map(async (product) => {
        // Extracting the stat for each product
        const stat = await ProductStat.find({
          productId: Product._id,
        });
        return {
          // Returning an array of objects
          ...product._doc, // Product information
          stat, // Combined with the stats per product
        };
      })
    );
    res.status(200).json(productWithStats);
  } catch (error) {
    res.status(404).json({ message: error.message }); // Very generic error
  }
};



export const getCustomers = async (req, res) => {
    try {
      const customers = await User.find({ role: "user" }).select("-password");
      res.status(200).json(customers);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
};


// Server Side Pagination
export const getTransactions = async (req, res) => {
  try {
    // Sort should look like this : { 'field' : 'userId', 'sort': 'dsce'}
    const { page=1, pageSize=20, sort=null, search=""} = req.query; // Grabbing all this data from the frontend

    // Formatted Sort should look like { userId : -1 }
    const generateSort = () => {
      const sortParsed = JSON.parse(sort)
      const sortFormatted = {
        [sortParsed.field]: sortParsed.sort = 'asc' ? 1 : -1
      };
      return sortFormatted;
    }

    const sortFormatted = Boolean(sort) ? generateSort() : {};
    
    const transaction = await Transaction.find({
      $or : [
        { cost : { $regex : new RegExp(search, "i") }},
        { userId : { $regex : new RegExp(search, "i") }}
      ]
    })
      .sort(sortFormatted)
      .skip(page * pageSize)
      .limit(pageSize)

    const total = await Transaction.countDocuments({
      name: { $regex : search, $options : 'i' }
    })

    res.status(200).json({
      transaction,
      total,
    });

  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}


export const getGeography = async( req, res ) => {
  try {
    const users = await User.find(); // Accessing all users from the user model
    const mappedLocations = users.reduce((acc, { country }) => {
      const countryISO3 = getCountryIso3(country); // Converts country to the proper format we need 
      
      if(!acc[countryISO3]){
        acc[countryISO3] = 0;
      }
      acc[countryISO3]++;
      return acc;
    }, {});

    const formattedLocation = Object.entries(mappedLocations).map(
      ([ country, count]) => {
        return { id: country, value: count }
      }
    );
    res.status(200).json(formattedLocation);
    
  } catch (e) {
    res.status(404).json({ message: e.message})
  }

}