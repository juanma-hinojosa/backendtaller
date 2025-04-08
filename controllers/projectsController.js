// const Project = require("../models/Project");
// const fs = require("fs");

// exports.getAll = async (req, res) => {
//   const projects = await Project.find().sort({ createdAt: -1 });
//   res.json(projects);
// };

// exports.getById = async (req, res) => {
//   const project = await Project.findById(req.params.id);
//   if (!project) return res.status(404).json({ msg: "No encontrado" });
//   res.json(project);
// };

// exports.create = async (req, res) => {
//   const { title, slug, resumen, descripcion, videoUrl } = req.body;
//   const portada = req.files["portada"]?.[0]?.path || "";
//   const galeria = req.files["galeria"]?.map((f) => f.path) || [];

//   const nuevo = new Project({ title, slug, resumen, descripcion, videoUrl, portada, galeria });
//   await nuevo.save();
//   res.status(201).json(nuevo);
// };

// exports.update = async (req, res) => {
//   const project = await Project.findById(req.params.id);
//   if (!project) return res.status(404).json({ msg: "No encontrado" });

//   const { title, slug, resumen, descripcion, videoUrl } = req.body;
//   if (req.files["portada"]) project.portada = req.files["portada"][0].path;
//   if (req.files["galeria"]) project.galeria = req.files["galeria"].map((f) => f.path);

//   project.title = title;
//   project.slug = slug;
//   project.resumen = resumen;
//   project.descripcion = descripcion;
//   project.videoUrl = videoUrl;

//   await project.save();
//   res.json(project);
// };

// exports.remove = async (req, res) => {
//   const project = await Project.findById(req.params.id);
//   if (!project) return res.status(404).json({ msg: "No encontrado" });

//   // Borrar imágenes del sistema de archivos
//   if (project.portada) fs.unlink(project.portada, () => {});
//   project.galeria.forEach((img) => fs.unlink(img, () => {}));

//   await project.deleteOne();
//   res.json({ msg: "Proyecto eliminado" });
// };

const Project = require("../models/Project");
const { v2: cloudinary } = require("cloudinary");

exports.getAll = async (req, res) => {
  const projects = await Project.find().sort({ createdAt: -1 });
  res.json(projects);
};

exports.getById = async (req, res) => {
  const project = await Project.findById(req.params.id);
  if (!project) return res.status(404).json({ msg: "No encontrado" });
  res.json(project);
};

exports.create = async (req, res) => {
  const { title, slug, resumen, descripcion, videoUrl } = req.body;

  const portada = req.files["portada"]?.[0]?.path || "";
  const galeria = req.files["galeria"]?.map((f) => f.path) || [];

  const nuevo = new Project({ title, slug, resumen, descripcion, videoUrl, portada, galeria });
  await nuevo.save();
  res.status(201).json(nuevo);
};

exports.update = async (req, res) => {
  const project = await Project.findById(req.params.id);
  if (!project) return res.status(404).json({ msg: "No encontrado" });

  const { title, slug, resumen, descripcion, videoUrl } = req.body;

  if (req.files["portada"]) {
    project.portada = req.files["portada"][0].path;
  }

  if (req.files["galeria"]) {
    project.galeria = req.files["galeria"].map((f) => f.path);
  }

  project.title = title;
  project.slug = slug;
  project.resumen = resumen;
  project.descripcion = descripcion;
  project.videoUrl = videoUrl;

  await project.save();
  res.json(project);
};

exports.remove = async (req, res) => {
  const project = await Project.findById(req.params.id);
  if (!project) return res.status(404).json({ msg: "No encontrado" });

  // En Cloudinary no hace falta eliminar archivos locales
  await project.deleteOne();
  res.json({ msg: "Proyecto eliminado" });
};
