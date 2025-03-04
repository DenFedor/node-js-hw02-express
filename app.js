const express = require("express");
const logger = require("morgan");
const cors = require("cors");
require("dotenv").config();
const contactsRouter = require("./routes/api/contacts.js");
const authRouter = require("./routes/api/auth.js");
const userRouter = require("./routes/api/users.js");
const app = express();
const path = require('path')

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/api/contacts", contactsRouter);
app.use("/api/auth", authRouter);
app.use("/", userRouter);

app.use('/avatars', express.static(path.join(__dirname, 'public/avatars/')))
app.use((req, res) => {
  res.status(404).json({ status: "error", code: 404, data: "Not found" });
});

app.use((err, req, res, next) => {
  if (err.message.includes("E11000 duplicate key error")) {
    return res.status(409).json({
      message: "Email in use",
    });
  }
  if (err.name === "ValidationError") {
    return res.status(400).json({
      message: err.name,err
    });
  }
  if (err.message.includes("missing required field email")) {
    return res.status(400).json({
      message: "Missing required field email",
    });
  }

  if (err.message.includes("Unauthorized")) {
    return res.status(401).json({
      message: "Email or password is wrong",
    });
  }
  if (err.message.includes("Not verified")) {
    return res.status(401).json({
      message: "User not verified",
    });
  }
  if (err.message.includes("User had been already verified")) {
    return res.status(400).json({
      message: err.message,
    });
  }
 
  if (
    err.message.includes("Token type is not valid") ||
    err.message.includes("No token provided") ||
    err.message.includes("JWT token is not valid")||
    err.message.includes("User not found")||
    err.message.includes("Token mismatch")
  ) {
    return res.status(401).json({
      message: "Not authorized",
    });
  }
  if (err.message==='Not Found') {
    return res.status(404).json({
      message: err.message,
    });
  }
  res.status(500).json({
    status: "fail",
    code: 500,
    message: err.message,
    data: "Internal Server Error",
  });
});

module.exports = app;
