// middleware/authorization.js
const jwt = require("jsonwebtoken");
const jwt_key = "james";

function authorization(roles = []) {
  return (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Token missing" });
    }

    try {
      const decoded = jwt.verify(token, jwt_key);

      req.user = {
        id: decoded.usersId,
        role: decoded.role,
      };

      if (roles.length > 0 && !roles.includes(decoded.role)) {
        return res.status(403).json({ message: "Forbidden: Access denied" });
      }

      next();
    } catch (err) {
      console.error("Auth error:", err.message);
      res.status(401).json({ message: "Invalid token" });
    }
  };
}

module.exports = authorization;
