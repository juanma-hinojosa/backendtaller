// 
const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const authHeader = req.header("Authorization");
  console.log("🧪 Authorization recibido:", authHeader); // 👈 LOG clave

  const token = authHeader && authHeader.startsWith("Bearer ")
    ? authHeader.split(" ")[1]
    : null;

  if (!token) {
    console.log("⚠️ Token ausente o malformado");
    return res.status(401).json({ message: "Acceso denegado. No hay token." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.admin = decoded;
    console.log("✅ Token válido:", decoded);
    next();
  } catch (err) {
    console.error("❌ Error al verificar token:", err.message);
    res.status(401).json({ message: "Token inválido." });
  }
};

module.exports = authMiddleware;
