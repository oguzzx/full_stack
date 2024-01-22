const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = express();
const mainRoute = require("./routes/index.js");
const logger = require("morgan");
const cors = require("cors");
const port = 5000;

dotenv.config();

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB bağlantısı başarılı");
  } catch (error) {
    throw error;
  }
};


// middleware
app.use(express.json());
app.use(logger("dev"));
app.use(cors());


app.use("/api", mainRoute);

app.listen(5000, () => {
  connect();
  console.log(`sunucu ${port} portunda başlatıldı`);
});
