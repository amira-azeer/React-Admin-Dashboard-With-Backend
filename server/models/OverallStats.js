import mongoose from "mongoose";
const { Schema, model } = mongoose;

const OverallStatSchema = new Schema({
  totalCustomer: Number,
  yearlySalesTotal: Number,
  yearlyTotalSoldUnits: Number,
  year: Number,
  monthlyData : [{
    month : String,
    totalSales : Number,
    totalUnits : Number,
    }],
  dailyData : [{
    date : String,
    totalSales : Number,
    totalUnits : Number,
    }],
  salesByCategory: {
    type: Map,
    of: Number,
  }
},
    { timestamps : true }
);

const OverallStat = model("OverallStat", OverallStatSchema);
export default OverallStat;
