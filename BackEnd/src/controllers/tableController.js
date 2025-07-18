import * as XLSX from 'xlsx';
import fs from 'fs';
import path from 'path';
import Table from '../models/Table.js';
import TableData from '../models/TableData.js';

export const createTableFromExcel = async (req, res) => {
  try {
    const filePath = req.file.path;
    const workbook = XLSX.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const data = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], { defval: '' });

    const { name, description } = req.body;
    const fields = Object.keys(data[0]);

    const newTable = new Table({
      name,
      description,
      fields,
      originalFile: req.file.filename
    });
    await newTable.save();

    const tableId = newTable._id;
    for (let item of data) {
      await new TableData({ tableId, data: item }).save();
    }

    res.status(201).json(newTable);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Gagal proses file Excel' });
  }
};

export const downloadOriginalFile = (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join('uploads', filename);
  if (!fs.existsSync(filePath)) return res.status(404).send('File tidak ditemukan');
  res.download(filePath);
};
