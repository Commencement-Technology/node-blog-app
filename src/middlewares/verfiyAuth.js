const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authHeader = req.header("Authorization");

  if (!authHeader) {
    return res
      .status(401)
      .json({ success: false, message: "No token provided" });
  }

  const token = authHeader.replace("Bearer ", "");
  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded JWT:", decoded);
    req.user = decoded;
    console.log("Assigned user to req.user:", req.user);
    return next();
  } catch (error) {
    console.error("JWT Verification Error:", error);
    return res.status(400).json({
      success: false,
      message: "Invalid token",
      error,
    });
  }
};
