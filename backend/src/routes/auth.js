const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const verifyToken = require("../middleware/authMiddleware");
const { getUsers } = require("../controller/userController");

const SECRET = process.env.JWT_SECRET;

const users = [
  {
    id: 1,
    email: "admin@gmail.com",
    password: bcrypt.hashSync("123456", 8),
    role: "admin",
  },
];

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Vui lòng nhập email và mật khẩu" });
  }

  const user = users.find(u => u.email === email);
  if (!user) {
    return res.status(400).json({ message: "Email không tồn tại" });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ message: "Sai mật khẩu" });
  }

  const token = jwt.sign(
    { id: user.id, role: user.role },
    SECRET,
    { expiresIn: "1h" }
  );

  const { password: _, ...safeUser } = user;
  res.json({ token, user: safeUser });
});

router.get("/users",getUsers, (req, res) => {
  const safeUsers = users.map(({ password, ...rest }) => rest);
  res.json(safeUsers);
});

module.exports = router;