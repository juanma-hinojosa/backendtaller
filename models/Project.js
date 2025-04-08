const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    resumen: String,
    descripcion: String,
    videoUrl: String,
    portada: String,
    galeria: [String],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Project", projectSchema);

