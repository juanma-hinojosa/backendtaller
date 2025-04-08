// routes/admin.js
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");
const authMiddleware = require("../middleware/auth");

// Login del admin
router.post("/", async (req, res) => {
  const { email, password } = req.body;
  console.log("Email:", email, "Password:", password); // <- AÑADIR ESTO

  try {
    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(404).json({ message: "Admin no encontrado" });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(400).json({ message: "Contraseña incorrecta" });

    console.log("JWT_SECRET:", process.env.JWT_SECRET); // ➤ debería mostrar "supersecreta"    

    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
    res.json({ token });
  } catch (err) {
    console.error("Error en login:", err); // <- AÑADIR ESTO
    res.status(500).json({ message: "Error de servidor" });
  }
});

// Ruta protegida de prueba
router.get("/dashboard", authMiddleware, (req, res) => {
  res.json({ message: "Bienvenido al panel admin" });
});

module.exports = router;
