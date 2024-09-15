import mongoose from "mongoose";
import configs from "../../configs";

export const connectDB = async () => {
  try {
    if (!configs.MONGODB_URI)
      throw new Error("MongoDB Connection Error: MongoDB URI invalid");

    await mongoose.connect(configs.MONGODB_URI);
    console.log("Connected to MongoDB!");
  } catch (error) {
    console.error("Error: Cannot connect to MongoDB!");
  }
};
