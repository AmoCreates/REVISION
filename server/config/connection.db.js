import mongoose from "mongoose";

const dbConnect = async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}/practice`);
    console.log("Database connected.")
  } catch (error) {
    console.log("err: Mongoose Connectiion Failed!")
  }
}

export default dbConnect;