const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const secret = process.env.JWT_SECRET || "supersecretkey";
const expiration = "2h";

const signToken = (user) => {
  const payload = { _id: user._id, email: user.email };
  return jwt.sign(payload, secret, { expiresIn: expiration });
};

const authMiddleware = ({ req }) => {
  let token = req.headers.authorization || "";

  if (token.startsWith("Bearer ")) {
    token = token.split(" ")[1];
  }

  if (!token) return { user: null };

  try {
    const decoded = jwt.verify(token, secret);
    return { user: decoded };
  } catch {
    console.log("Invalid token");
    return { user: null };
  }
};

module.exports = { signToken, authMiddleware };
