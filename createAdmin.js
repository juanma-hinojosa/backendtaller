const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const MONGO_URI = process.env.MONGO_URI || "mongodb+srv://stakedevar:stakedev@cluster0.4io8zul.mongodb.net/taller";

// Esquema mínimo del admin
const adminSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const Admin = mongoose.model("Admin", adminSchema);

const createAdmin = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("🟢 Conectado a MongoDB");

    const existing = await Admin.findOne({ email: "juanma.hinojosa97@gmail.com" });
    if (existing) {
      console.log("⚠️ El admin ya existe.");
      return process.exit();
    }

    const hashedPassword = await bcrypt.hash("hinojosa97", 10);

    const newAdmin = new Admin({
      email: "juanma.hinojosa97@gmail.com",
      password: hashedPassword,
    });

    await newAdmin.save();
    console.log("✅ Admin creado correctamente.");
  } catch (err) {
    console.error("❌ Error al crear el admin:", err);
  } finally {
    mongoose.disconnect();
  }
};

createAdmin();

// require("dotenv").config();
// const jwt = require("jsonwebtoken");

// const token = jwt.sign({ id: "67f532f09d06103a71db95cf" }, process.env.JWT_SECRET, {
//   expiresIn: "24h",
// });

// console.log("Nuevo token:", token);
