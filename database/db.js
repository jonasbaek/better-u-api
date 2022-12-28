const mongoose = require("mongoose");

const connectDatabase = () => {
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

module.exports = connectDatabase;
