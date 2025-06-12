const mongoose = require("mongoose");

const uri = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/MERN_loginApp";

mongoose.set("strictQuery", true);

const connect = async () => {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB Connected");
  } catch (err) {
    console.error("DB Connection Error:", err);
    throw err;
  }
};

module.exports = connect;