require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();

const userRoutes = require("./src/routes/userRoutes");
const authRoutes = require("./src/routes/auth");

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send("Backend is running");
});

// Routes
app.use("/api", authRoutes);
app.use("/api", userRoutes);

app.listen(3001, () => {
  console.log("Server chạy tại http://localhost:3001");
});