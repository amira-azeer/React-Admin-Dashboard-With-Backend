import mongoose from "mongoose";
const { Schema, model } = mongoose;

const newSchemaCreation = new Schema({
    name: String,
    price: Number,
    description: String,
    category: String,
    rating: Number,
    supply: Number,
  },
      { timestamps : true }
  );
  
  const NewSchema = model("NewSchema", newSchemaCreation);
  export default NewSchema;



  