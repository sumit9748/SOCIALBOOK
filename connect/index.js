const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const multer = require("multer");
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");
const conversationRoute = require("./routes/conversations");
const messageRoute = require("./routes/messages");
const onlineRoute = require("./routes/onlines");
const router = express.Router();
const path = require("path");
const cors = require("cors");

dotenv.config();

mongoose.connect(
  'mongodb://localhost:27017/socialbook',
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("Connected to MongoDB");
  }
);
app.use("/images", express.static(path.join(__dirname, "public/images")));
app.use(cors(
  origin = "*",
));

//middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const upload = multer({ storage: storage });
app.post("/connect/upload", upload.single("file"), (req, res) => {
  try {
    return res.status(200).json("File uploded successfully");
  } catch (error) {
    console.error(error);
  }
});

app.use("/connect/auth", authRoute);
app.use("/connect/users", userRoute);
app.use("/connect/posts", postRoute);
app.use("/connect/conversations", conversationRoute);
app.use("/connect/messages", messageRoute);
app.use("/connect/onlines", onlineRoute);

app.listen(8000, () => {
  console.log("Backend server is running!");
});