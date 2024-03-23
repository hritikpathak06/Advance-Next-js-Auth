import mongoose from "mongoose";

export async function connectToDB() {
  try {
    mongoose.connect(process.env.MONGO_DB_URI!);
    const connection = mongoose.connection;
    connection.on("connected", () => {
      console.log("MongoDb Connected Successfully");
    });
    connection.on("error", (err) => {
      console.log(
        "MongoDB Connection Error.Please Make Sure Mongodb is running",
        err
      );
      process.exit();
    });
  } catch (error) {
    console.log("Something Went Wrong In Connecting With DB", error);
  }
}
