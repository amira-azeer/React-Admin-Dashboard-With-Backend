import OverallStat from "../models/OverallStats.js";

export const getSales = async(req, res) => {
    try{
        const overallStats = await OverallStat.find(); // Grab everything from the database
        res.status(200).json(overallStats[0])

    } catch (e) {
        res.status(404).json({ message: e.message })
    }
}
