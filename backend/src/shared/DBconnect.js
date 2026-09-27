import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();

export const DBconnect = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected:", conn.connection.host);
  } catch (error) {
    console.log("MongoDB connect unsuccessfully", error);
    process.exit(1);
  }
};