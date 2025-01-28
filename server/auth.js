const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const secret = process.env.JWT_SECRET || "supersecretkey";
const expiration = "2h";

// Sign a token
const signToken = (user) => {
  const payload = { _id: user._id, email: user.email };
  return jwt.sign(payload, secret, { expiresIn: expiration });
};

// Middleware for authentication
const authMiddleware = ({ req }) => {
  let token = req.headers.authorization || "";

  if (token.startsWith("Bearer ")) {
    token = token.split(" ")[1];
  }

  if (!token) {
    return req;
  }

  try {
    const decoded = jwt.verify(token, secret);
    req.user = decoded;
  } catch (err) {
    console.log("Invalid token");
  }

  return req;
};

module.exports = { signToken, authMiddleware };
