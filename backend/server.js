const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const app = express();
app.use(cors());
app.use(express.json());

const SECRET = "mysecretkey";

const users = [
  {
    id: 1,
    email: "admin@gmail.com",
    password: bcrypt.hashSync("123456", 8),
    role: "admin",
  },
  {
    id: 2,
    email: "kien11414@gmail.com",
    password: bcrypt.hashSync("123456", 8),
    role: "user",
  },
  {
    id: 3,
    email: "kien1@gmail.com",
    password: bcrypt.hashSync("123456", 8),
    role: "user",
  },
];

// ✅ route test
app.get("/", (req, res) => {
  res.send("API đang chạy 🚀");
});

// ✅ API login
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  const user = users.find((u) => u.email === email);

  if (!user) {
    return res.status(400).json({ message: "Email không tồn tại" });
  }

  const isMatch = bcrypt.compareSync(password, user.password);

  if (!isMatch) {
    return res.status(400).json({ message: "Sai mật khẩu" });
  }

  const token = jwt.sign(
    { id: user.id, role: user.role },
    SECRET,
    { expiresIn: "1h" }
  );

  res.json({
    token,
    user: {
      id: user.id,
      email: user.email,
      role: user.role,
    },
  });

});

// ✅ chạy server
app.listen(3001, () => {
  console.log("Server chạy tại http://localhost:3001");
});
