const JWT = require("jsonwebtoken");

const SecretKey = "BlogApp@123";

function generateToken(user) {
  const payload = {
    id: user._id,
    email: user.email,
    role: user.role,
    profileImageURL: user.profileImageURL,
  };

  return JWT.sign(payload, SecretKey, { expiresIn: "24h" });
}

function verifyToken(token) {
  try {
    return JWT.verify(token, SecretKey);
  } catch (error) {
    return null;
  }
}

module.exports = {
    generateToken,
    verifyToken,
};
