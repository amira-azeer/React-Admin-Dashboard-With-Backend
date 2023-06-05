import mongoose from "mongoose";
import User from "../models/User.js";


export const getAdmins = async(req, res) => {
    try {
        const admins = await User.find({ role: "admin" }).select("-password"); // sends data without the password 
        res.status(200).json(admins)

    } catch (e) {
        res.status(404).json({ message : e.message })
    }
}