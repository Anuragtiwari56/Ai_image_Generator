import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import 'dotenv/config';
import PostRouter from './routes/Posts.js'
import generateImageRouter from './routes/GenerateImage.js'
const app =express();
app.use(cors({}));
app.use(express.json({limit:"50mb"}));
app.use(express.urlencoded({ extended: true })); // for form data

// error handler middleware
app.use((err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || "Something went wrong";
    return res.status(status).json({
      success: false,
      status,
      message,
    });
  });
  app.use('/api/post',PostRouter);
  app.use('/api/generateImage',generateImageRouter);
  //default
  app.get("/", async (req, res) => {
    res.status(200).json({
      message: "Hello developers from HLP",
    });
  });
  //connect mongodb
  const connectDB = () => {
    // mongoose.set("strictQuery", true);
    mongoose
      .connect(process.env.MONGODB_URL)
      .then(() => console.log("Connected to Mongo DB"))
      .catch((err) => {
        console.error("failed to connect with mongo");
        console.error(err);
      });
  };
  const startServer = async () => {
    try {
      connectDB();
      app.listen(3000, () => console.log("Server started on port 8080"));
    } catch (error) {
      console.log(error);
    }
  };
  
  startServer();