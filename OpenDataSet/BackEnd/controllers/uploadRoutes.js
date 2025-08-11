import express from "express";
import upload from "../config/upload.js";
import Table from "../models/Table.js";

const router = express.Router();

router.post("/", upload.single("file"), async (req, res) => {
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

export default router;
