const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Không có token
  if (!authHeader) {
    return res.status(401).json({
      message: "No token provided"
    });
  }

  // Bearer TOKEN
  const token = authHeader.split(" ")[1];

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {

    // Token sai hoặc hết hạn
    if (err) {
      return res.status(403).json({
        message: "Invalid token"
      });
    }

    // Lưu user vào request
    req.user = decoded;

    next();
  });
};

module.exports = verifyToken;