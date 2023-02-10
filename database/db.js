import mongoose from "mongoose";

const connectDatabase = () => {
  mongoose.set("strictQuery", true);
  mongoose
    .connect(`${process.env.MONGODB_URI}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((error) => {
      console.log(error);
    });
};

export default connectDatabase;
