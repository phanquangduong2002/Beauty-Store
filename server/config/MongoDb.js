import mongoose from "mongoose";

const connectDatabase = async () => {
  try {
    mongoose.set("strictQuery", false);

    await mongoose.connect(process.env.MONGODB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Mongodb connected");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

export default connectDatabase;
