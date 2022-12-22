//dotenv
require("dotenv").config();

//conect to DB
const { connectDB } = require("./configs/db");
connectDB();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
// Import routes
const authRouter = require("./routes/authRoute");
const postRouter = require("./routes/postsRoute");
const userRoute = require("./routes/userRoute");
// Import error handlers
const { errorHandler } = require("./middlewares/errorHandler");
const { verifyToken } = require("./middlewares/verifyToken");
const app = express();

// Cors
app.use(cors());

// Body Parser
app.use(express.json());

// Mounted the route
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/posts", postRouter);
app.use("/api/v1/get-users", userRoute);

// Unhandled Route
app.all("*", (req, res, next) => {
  const err = new Error("Unhandled Route??");
  err.statusCode = 404;
  next(err);
});
app.use(verifyToken);
app.use(errorHandler);
// app.get("/", (req, res, next) => {

// });

const PORT = process.env.APP_PORT || 5000;
const URI = process.env.DB_URI;

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
