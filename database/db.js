import mongoose from "mongoose";

const connectDatabase = () => {
  mongoose.set("strictQuery", true);
  mongoose
    .connect(`${process.env.mongodbConnection}`, {
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
