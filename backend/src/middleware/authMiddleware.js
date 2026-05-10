require("dotenv").config();
const jwt = require("jsonwebtoken");

const SECRET = process.env.JWT_SECRET;

function verifyToken(req, res, next) {
  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    return res.status(401).json({ message: "TEST" });
  }

  const parts = authHeader.split(" ");
  if (parts.length !== 2 || parts[0] !== "Bearer") {
    return res.status(403).json({ message: "Định dạng token không hợp lệ" });
  }

  const token = parts[1];

  try {
    const decoded = jwt.verify(token, SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token đã hết hạn" });
    }
    return res.status(401).json({ message: "Token không hợp lệ" });
  }
}
console.log("🔥 MIDDLEWARE FILE:", __filename);

module.exports = verifyToken;