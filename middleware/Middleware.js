const user = require("../model/UserModel");
const jwt = require("jsonwebtoken");
const dotEnv = require("dotenv");

dotEnv.config();

const secretKey = process.env.KEY;

const verifyToken = async (req, res, next) => {
  const token = req.headers.token;

  console.log(token);

  if (!token) {
    return res.status(401).json({ error: "Token is required" });
  }
  try {
    const decoded = jwt.verify(token, secretKey);
    const userid = await user.findById(decoded.id);

    console.log(userid);

    if (!userid) {
      return res.status(404).json({ error: "user not found" });
    }

    req.id = user._id;

    next();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Invalid token" });
  }
};

module.exports = verifyToken;
