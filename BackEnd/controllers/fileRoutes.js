// controllers/fileRoutes.js
import express from "express";
import fs from "fs";
import path from "path";
import upload from "../config/upload.js";
import Table from "../models/Table.js";

const router = express.Router();
const uploadFolder = "./uploads";

// CREATE - Upload file + simpan ke database
router.post("/upload", upload.single("file"), async (req, res) => {
  try {
    const { name, description, kategori, tahun, sumber, format, ukuran } = req.body;

    const table = new Table({
      name,
      description,
      kategori,
      tahun,
      sumber,
      format,
      ukuran,
      fields: [],
      originalFile: req.file.filename,
      url: `/uploads/${req.file.filename}`,
    });

    await table.save();
    res.status(200).json({ message: "Berhasil upload file & simpan data.", table });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Gagal upload file." });
  }
});

// READ - List semua file
router.get("/files", (req, res) => {
  fs.readdir(uploadFolder, (err, files) => {
    if (err) return res.status(500).json({ error: "Gagal membaca folder" });
    res.json({ files });
  });
});

// READ - Download file
router.get("/files/:filename", (req, res) => {
  const filePath = path.join(uploadFolder, req.params.filename);
  if (fs.existsSync(filePath)) {
    res.download(filePath);
  } else {
    res.status(404).json({ error: "File tidak ditemukan" });
  }
});

// UPDATE - Ganti file
router.put("/files/:filename", upload.single("file"), (req, res) => {
  const oldFilePath = path.join(uploadFolder, req.params.filename);
  if (!fs.existsSync(oldFilePath)) {
    return res.status(404).json({ error: "File lama tidak ditemukan" });
  }

  fs.unlinkSync(oldFilePath);

  res.json({
    message: "File berhasil diganti",
    newFilename: req.file.filename,
    path: `/uploads/${req.file.filename}`,
  });
});

// DELETE - Hapus file
router.delete("/files/:filename", (req, res) => {
  const filePath = path.join(uploadFolder, req.params.filename);
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
    res.json({ message: "File berhasil dihapus" });
  } else {
    res.status(404).json({ error: "File tidak ditemukan" });
  }
});

export default router;
