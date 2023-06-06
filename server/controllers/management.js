import mongoose from "mongoose";
import User from "../models/User.js";
import Transaction from "../models/Transaction.js";

export const getAdmins = async (req, res) => {
  try {
    const admins = await User.find({ role: "admin" }).select("-password"); // sends data without the password
    res.status(200).json(admins);
  } catch (e) {
    res.status(404).json({ message: e.message });
  }
};

// export const getUserPerformance = async (req, res) => {
  //   try {
    //     const { id } = req.params;
    //     const userWithStats = await User.aggregate([
      //       { $match: { _id: new mongoose.Types.ObjectId(id) } }, // Converting it to the right format with mongoose.Types...
      //       {
        //         $lookup: {
          //           from: "affiliatestats", // Checking for a match in the UserID table to the AffiliateStats table/collection
          //           localField: "_id",
          //           foreignField: "userId",
          //           as: "affiliateStats", // Saving in a property known as Affiliate Stats
          //         },
          //       },
          //       { $unwind: "$affiliateStats" }, // Flatten the array/obj
          //     ]);
          
          //     const salesTransactons = await Promise.all(
            //       userWithStats[0].affiliateStats.affiliateSales.map((id) => {
              //         return Transaction.findById(id);
              //       })
              //     );
              
              //     const filteredSalesTransaction = salesTransactons.filter(
                //       (transaction) => transaction != null
                //     );
                
                //     res
                //       .status(200)
                //       .json({ user: userWithStats[0], sales: filteredSalesTransaction });
                //   } catch (e) {
                  //     res.status(400).json({ message: e.message });
                  //   }
                  // };
                  
                  
// Aggregate API Call - Below method is faster than product stats find
export const getUserPerformance = async (req, res) => {
  try {
    const { id } = req.params;

    const userWithStats = await User.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(id) } }, // Converting it to the right format with mongoose.Types...
      {
        $lookup: {
          from: "affiliatestats", // Checking for a match in the UserID table to the AffiliateStats table/collection
          localField: "_id",
          foreignField: "userId",
          as: "affiliateStats",
        },
      },
      { $unwind: "$affiliateStats" },
    ]);

    const saleTransactions = await Promise.all(
      userWithStats[0].affiliateStats.affiliateSales.map((id) => {
        return Transaction.findById(id);
      })
    );
    const filteredSaleTransactions = saleTransactions.filter(
      (transaction) => transaction !== null
    );

    res
      .status(200)
      .json({ user: userWithStats[0], sales: filteredSaleTransactions });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};