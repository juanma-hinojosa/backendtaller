// const express = require("express");
// const router = express.Router();
// const multer = require("multer");
// const auth = require("../middleware/auth");

// const {
//   getAll,
//   getById,
//   create,
//   update,
//   remove,
// } = require("../controllers/projectsController");

// const Project = require("../models/Project"); // Asegurate que el path esté bien

// // Configuración de Multer
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => cb(null, "uploads/"),
//   filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
// });

// const upload = multer({ storage });

// // ✅ Ruta para obtener todos los proyectos
// router.get("/", getAll);

// // ✅ NUEVA RUTA: obtener proyecto por SLUG
// router.get("/slug/:slug", async (req, res) => {
//   try {
//     const project = await Project.findOne({ slug: req.params.slug });
//     if (!project) {
//       return res.status(404).json({ msg: "Proyecto no encontrado" });
//     }
//     res.json(project);
//   } catch (error) {
//     console.error("Error buscando por slug:", error);
//     res.status(500).json({ msg: "Error del servidor" });
//   }
// });

// // ✅ Ruta para obtener proyecto por ID
// router.get("/:id", getById);

// // Rutas protegidas (require Login)
// // ✅ Crear nuevo proyecto
// router.post(
//   "/",
//   auth,
//   upload.fields([{ name: "portada" }, { name: "galeria" }]),
//   create
// );

// // ✅ Actualizar proyecto
// router.put(
//   "/:id",
//   auth,
//   upload.fields([{ name: "portada" }, { name: "galeria" }]),
//   update
// );

// // ✅ Eliminar proyecto
// router.delete("/:id", auth, remove);

// module.exports = router;
const express = require("express");
const router = express.Router();
const multer = require("multer");
const auth = require("../middleware/auth");

const {
  getAll,
  getById,
  create,
  update,
  remove,
} = require("../controllers/projectsController");

const Project = require("../models/Project"); // Asegurate que el path esté bien

// ✅ Configuración de Multer con Cloudinary
const { storage } = require("../config/cloudinary");
const upload = multer({ storage });

// ✅ Ruta para obtener todos los proyectos
router.get("/", getAll);

// ✅ Obtener proyecto por SLUG
router.get("/slug/:slug", async (req, res) => {
  try {
    const project = await Project.findOne({ slug: req.params.slug });
    if (!project) {
      return res.status(404).json({ msg: "Proyecto no encontrado" });
    }
    res.json(project);
  } catch (error) {
    console.error("Error buscando por slug:", error);
    res.status(500).json({ msg: "Error del servidor" });
  }
});

// ✅ Obtener proyecto por ID
router.get("/:id", getById);

// ✅ Crear nuevo proyecto (requiere login y subida a Cloudinary)
router.post(
  "/",
  auth,
  upload.fields([{ name: "portada" }, { name: "galeria" }]),
  create
);

// ✅ Actualizar proyecto (requiere login y subida a Cloudinary)
router.put(
  "/:id",
  auth,
  upload.fields([{ name: "portada" }, { name: "galeria" }]),
  update
);

// ✅ Eliminar proyecto
router.delete("/:id", auth, remove);

module.exports = router;
