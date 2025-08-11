import mongoose from 'mongoose';

const tableSchema = new mongoose.Schema({
  name: { type: String, required: true },             // Nama tabel atau file
  description: { type: String, default: '' },          // Deskripsi file
  kategori: { type: String },                          // Kategori file
  tahun: { type: Number },                             // Tahun
  sumber: { type: String },                            // Sumber data
  format: { type: String },                            // Format file (xlsx, csv, dll)
  ukuran: { type: String },                            // Ukuran file (misalnya "2MB")
  url: { type: String },                               // URL akses file
  fields: [{ type: String }],                          // List nama kolom
  originalFile: { type: String },                      // Nama file asli
}, { timestamps: true });                              // CreatedAt & UpdatedAt otomatis

export default mongoose.model('Table', tableSchema);
