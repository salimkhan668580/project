
const jwt = require("jsonwebtoken");

const isAuth = (req, res, next) => {
  const token = req.headers["token"];
  if (!token) {
    return res.status(401).json({ message: "You are unauthorized !" });
  }
  try {
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET); 
    req.user = decoded; 
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
module.exports = isAuth;
