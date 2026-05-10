const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// routes
const authRoutes = require("./routes/auth");
app.use("/api", authRoutes);

app.get("/", (req, res) => {
  res.send("API đang chạy 🚀");
});

module.exports = app;