import mongoose from 'mongoose';

const tableSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, default: '' }, // tambahkan ini
    kategori: { type: String },
    tahun: { type: String },
    sumber: { type: String },
    format: { type: String },
    ukuran: { type: String },
    url: { type: String },
    fields: [{ type: String }],
    originalFile: { type: String }
});

export default mongoose.model('Table', tableSchema);