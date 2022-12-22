const mongoose = require("mongoose");

const connectDB = async () => {
  console.log("!!!");
  try {
    console.log("BD connecting successfully");
    const conn = await mongoose.connect(
      // process.env.DB_URI
      "mongodb+srv://admin:sawsew123@cluster0.txq8nij.mongodb.net/?retryWrites=true&w=majority"
      , {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    //   useCreateIndex: true,
    });
    console.log("BD connected successfully");
  } catch (err) {
    console.log("err");
    process.exit(1);
  }
};

module.exports = { connectDB };
