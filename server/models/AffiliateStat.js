import mongoose from "mongoose";
const { Schema, model } = mongoose;

const AffiliateStatSchema = new Schema(
{
    userId: { type: mongoose.Types.ObjectId, ref: "User" }, // Refers to the User model
    affiliateSales: { // Refers to the Transaction model
        type : [ mongoose.Types.ObjectId ], 
        ref: "Transaction" 
    } 
},
    { timestamps : true }
);

const AffiliateStat = model("AffiliateStat", AffiliateStatSchema);
export default AffiliateStat;