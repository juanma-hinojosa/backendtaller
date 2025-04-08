const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./db");

dotenv.config();
const app = express();
connectDB();

app.use(
  cors({
    origin: "http://localhost:5173", // o el frontend que estés usando
    credentials: true,
  })
);
app.use(express.json());
app.use("/uploads", express.static("uploads"));

const projectsRoutes = require("./routes/projects");
app.use("/api/projects", projectsRoutes);

const adminRoutes = require("./routes/admin"); // debe coincidir con el nombre real del archivo
app.use("/api/admin", adminRoutes); // esto genera /api/admin/

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
